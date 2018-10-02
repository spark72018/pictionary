import React, { Component } from 'react';
import io from 'socket.io-client';
import JoinRoom from './components/JoinRoom';
import GameRoom from './components/GameRoom';
import ChatRoom from './components/ChatRoom';
import TimeLeft from './components/TimeLeft';
import DrawingBoard from './components/DrawingBoard';
import getTime from './utilityFns/getTime';
import getRandomElement from './utilityFns/getRandomElement';
import {
  ROOM_NAMES,
  DEV_URL,
  DEFAULT_COLOR,
  EASY_WORDS,
  MEDIUM_WORDS,
  HARD_WORDS
} from './constants';
import './App.css';

/* TODOS:
- countdown for drawer to think about word (10 seconds)
- or drawer can start round
- after start round, drawer can draw
- drawer can click chat room messages that are warm/close to answer
- press finish round to finish
- drawer can pick user that got correct answer
- update user score
- get next drawer
- repeat
*/

class App extends Component {
  state = {
    askForUserName: false,
    joinRoomName: '',
    joinedRoom: false,
    roomInfo: null,
    msgs: [],
    previousWords: [],
    // pickDifficulty: false,
    pickDifficulty: true, // for dev
    drawing: false,
    currentColor: DEFAULT_COLOR,
    currentMouseCoords: {},
    currentWord: '',
    intervalId: null,
    showAlert: false,
    // isDrawer: false,
    isDrawer: true, // for dev
    alertInfo: {
      title: 'Unauthorized',
      text: 'You are not the drawer!'
    },
    easyWords: EASY_WORDS,
    mediumWords: MEDIUM_WORDS,
    hardWords: HARD_WORDS
  };

  socket = io(DEV_URL);

  componentDidMount() {
    return this.initSocket(this.socket);
  }

  initSocket = socket => {
    socket.on('joined room', this.handleJoinedRoom);
    socket.on('updateChat', this.handleUpdateChat);
    socket.on('room playing', this.handleRoomPlaying);
  };


  // SOCKET HANDLERS
  handleRoomPlaying = ({ roomInfo, id }) => {
    this.setState({ roomInfo, id });
    const { users, currentDrawerIdx } = roomInfo;
    const currentDrawer = users[currentDrawerIdx];
    if (currentDrawer.id === id) {
      this.setState({ isDrawer: true });
      this.setPickDifficulty(true);
    }
  };

  handleUpdateChat = dataObj => this.addMsg(dataObj);

  handleJoinedRoom = roomInfo => {
    console.log('handleJoinedRoom');

    return this.setState({
      joinedRoom: true,
      roomInfo,
      msgs: [
        {
          username: '',
          time: getTime(),
          msg: 'You have successfully joined!'
        }
      ]
    });
  };


  // CLICK HANDLERS
  handlePickDifficultyClick = e => {
    const { difficulty } = e.target.dataset;
    const randomWord = this.pickRandomWordFrom(difficulty);

    this.setState({ currentWord: randomWord });
    this.addToPreviousWords(randomWord);
    this.setPickDifficulty(false);

    this.socket.emit('round ready');
  };

  handleStartGameClick = e => {
    console.log('handleStartGameClick called');
    const { roomInfo } = this.state;
    if (roomInfo.users.length < 2) {
      return this.showCannotStartGameAlert();
    }

    this.socket.emit('start game');
  };

  handleStartRoundClick = e => {
    console.log('handleStartRoundClick');
  };

  handleSubmit = (e, username) => {
    e.preventDefault();
    const { joinRoomName } = this.state;

    this.socket.emit('join room', {
      username,
      joinRoomName,
      time: getTime()
    });
  };

  handleRoomItemClick = e => {
    const joinRoomName = e.target.innerText;

    this.setAskForUserName(true);

    if (joinRoomName === 'Whiskey Room') {
      return this.setJoinRoomName('whiskeyRoom');
    } else if (joinRoomName === 'Wine Room') {
      return this.setJoinRoomName('wineRoom');
    }
  };

  // SETTERS
  setMouseCoords = (x, y) => this.setState({ currentMouseCoords: { x, y } });

  setCurrentColor = color => this.setState({ currentColor: color });

  setDrawing = bool => this.setState({ drawing: bool });

  setAskForUserName = bool => this.setState({ askForUserName: bool });

  setJoinRoomName = str => this.setState({ joinRoomName: str });

  setPickDifficulty = bool => this.setState({ pickDifficulty: bool });

  // FUNCTIONS THAT ADD TO STATE
  addToPreviousWords = word => {
    const { previousWords } = this.state;

    return this.setState({ previousWords: [...previousWords, word] });
  };

  addMsg = msgData => {
    const { msgs } = this.state;

    if (msgs.length < 50) {
      return this.setState({ msgs: [...msgs, msgData] });
    } else {
      const [head, ...tail] = msgs;

      return this.setState({ msgs: [...tail, msgData] });
    }
  };

  addToPreviousWords = word => {
    const { previousWords } = this.state;

    return this.setState({ previousWords: [...previousWords, word] });
  };

  // miscellaneous 
  showCannotStartGameAlert = () =>
    this.setState({
      showAlert: true,
      alertInfo: {
        title: 'Cannot start the game yet',
        text: 'This game requires at least two players'
      }
    });

  emitDrawingInfo = (x0, y0, x1, y1, color, canvas) => {
    const w = canvas.width;
    const h = canvas.height;
    const data = {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color
    };

    this.socket.emit('drawing', data);
  };

  drawLine = (x0, y0, x1, y1, color, emit, canvas) => {
    console.log('drawLine called');
    const cxt = canvas.getContext('2d');
    const adjustedY0 = y0 - canvas.getBoundingClientRect().top;
    const adjustedY1 = y1 - canvas.getBoundingClientRect().top;
    const adjustedX0 = x0 - canvas.getBoundingClientRect().left;
    const adjustedX1 = x1 - canvas.getBoundingClientRect().left;

    cxt.beginPath();
    cxt.moveTo(adjustedX0, adjustedY0);
    cxt.lineTo(adjustedX1, adjustedY1);
    cxt.strokeStyle = color;
    cxt.lineWidth = 2;
    cxt.stroke();
    cxt.closePath();

    if (!emit) return;

    const { currentColor } = this.state;

    return this.emitDrawingInfo(x0, y0, x1, y1, currentColor, canvas);
  };

  pickRandomWordFrom = difficulty => {
    const words = this.state[difficulty];
    const word = getRandomElement(words);

    return word;
  };

  // MOUSE MOVEMENT HANDLERS
  handleMouseMoveBoard = (e, canvas) => {
    const {
      drawing,
      currentMouseCoords: { x, y },
      currentColor
    } = this.state;

    if (!drawing) return;

    this.drawLine(x, y, e.clientX, e.clientY, currentColor, true, canvas);

    return this.setMouseCoords(e.clientX, e.clientY);
  };

  handleMouseUpBoard = (e, canvas) => {
    if (!this.state.drawing) return;

    this.setDrawing(false);

    const {
      currentMouseCoords: { x, y },
      currentColor
    } = this.state;
    return this.drawLine(
      x,
      y,
      e.clientX,
      e.clientY,
      currentColor,
      true,
      canvas
    );
  };

  handleMouseDownBoard = e => {
    this.setDrawing(true);

    return this.setMouseCoords(e.clientX, e.clientY);
  };

  render() {
    const {
      askForUserName,
      joinRoomName,
      joinedRoom,
      msgs,
      seconds,
      showAlert,
      alertInfo,
      pickDifficulty,
      currentWord,
      isDrawer
    } = this.state;

    return !joinedRoom ? (
      <JoinRoom
        roomNames={ROOM_NAMES}
        askForUserName={askForUserName}
        handleRoomItemClick={this.handleRoomItemClick}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <GameRoom
        showAlert={showAlert}
        alertInfo={alertInfo}
        seconds={seconds}
        pickDifficulty={pickDifficulty}
        currentWord={currentWord}
        isDrawer={isDrawer}
        handleStartGameClick={this.handleStartGameClick}
        handleStartRoundClick={this.handleStartRoundClick}
        handlePickDifficultyClick={this.handlePickDifficultyClick}
      >
        <ChatRoom msgs={msgs} socket={this.socket} />
        <DrawingBoard
          handleMouseMove={this.handleMouseMoveBoard}
          handleMouseDown={this.handleMouseDownBoard}
          handleMouseUp={this.handleMouseUpBoard}
          handleMouseOut={this.handleMouseUpBoard}
          drawLine={this.drawLine}
          socket={this.socket}
        />
      </GameRoom>
    );
  }
}

export default App;
