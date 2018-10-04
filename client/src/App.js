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

// When user joins room, if(roomInfo.playing) and !roomInfo.usersPlaying.find(info => info.id === myId)
// then user is spectator
// Also handle when next round begins, so user can join game

class App extends Component {
  state = {
    askForUserName: false,
    askForWinner: false,
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
    wordDifficulty: '',
    easyWords: EASY_WORDS,
    mediumWords: MEDIUM_WORDS,
    hardWords: HARD_WORDS,
    preRound: false,
    gameRound: false
  };

  socket = io(DEV_URL);

  componentDidMount() {
    return this.initSocket(this.socket);
  }

  initSocket = socket => {
    socket.on('joined room', this.handleJoinedRoom);
    socket.on('updateChat', this.handleUpdateChat);
    socket.on('room playing', this.handleRoomPlaying);
    socket.on('pickedDifficulty', this.handlePickedDifficulty);
    socket.on('updatePreRoundSeconds', this.handleUpdatePreRoundSeconds);
    socket.on('updateGameRoundSeconds', this.handleUpdateGameRoundSeconds);
    socket.on('endPreRound', this.handleEndPreRound);
    socket.on('endGameRound', this.handleEndGameRound);
    socket.on('startGameRound', this.handleStartGameRound);
    socket.on('endGameRound', this.handleEndGameRound);
    socket.on('announceWinner', this.handleAnnounceWinner);
  };

  // SOCKET HANDLERS
  handleEndPreRound = () => this.setPreRound(false);
  handleUpdateChat = dataObj => this.addMsg(dataObj);
  handlePickedDifficulty = difficulty => {
    this.setState({ wordDifficulty: difficulty });

    window.setTimeout(() => {
      this.setState({ wordDifficulty: '' });
    }, 2000);
  };

  handleStartGameRound = () => {
    this.setPreRound(false);
    this.setGameRound(true);
  };

  handleUpdateGameRoundSeconds = roomInfo => this.setRoomInfo(roomInfo);

  handleRoomPlaying = ({ roomInfo, id }) => {
    this.setState({ roomInfo, id });

    const { usersPlaying, currentDrawerIdx } = roomInfo;
    const currentDrawer = usersPlaying[currentDrawerIdx];

    if (currentDrawer.id === id) {
      this.setState({ isDrawer: true });
      this.setPickDifficulty(true);
    }
  };

  handleJoinedRoom = roomInfo => {
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

  handleUpdatePreRoundSeconds = roomInfo => {
    this.setPreRound(true);
    this.setState({ roomInfo });
  };

  // CLICK HANDLERS
  handleStartGameClick = e => {
    console.log('handleStartGameClick called');
    const { roomInfo } = this.state;
    if (roomInfo.users.length < 2) {
      return this.showCannotStartGameAlert();
    }

    this.socket.emit('start game');
  };

  handlePickDifficultyClick = e => {
    const { difficulty } = e.target.dataset;
    const randomWord = this.pickRandomWordFrom(difficulty);

    this.setState({ currentWord: randomWord });
    this.addToPreviousWords(randomWord);
    this.setPickDifficulty(false);

    this.socket.emit('pickedDifficulty', difficulty);
    this.socket.emit('round ready');
  };

  handleStartRoundClick = e => {
    console.log('handleStartRoundClick');
  };

  handleSubmit = (e, username) => {
    e.preventDefault();

    const { joinRoomName } = this.state;

    return this.socket.emit('join room', {
      username,
      joinRoomName,
      time: getTime()
    });
  };

  handleEndGameRound = () => this.setAskForWinner(true);

  handleRoomItemClick = e => {
    const joinRoomName = e.target.innerText;

    this.setAskForUserName(true);

    if (joinRoomName === 'Whiskey Room') {
      return this.setJoinRoomName('whiskeyRoom');
    } else if (joinRoomName === 'Wine Room') {
      return this.setJoinRoomName('wineRoom');
    }
  };

  handlePickWinnerClick = e => {
    console.log('handlePickWinnerClick', e.target);
    this.setAskForWinner(false);

    const { id } = e.target.dataset;

    return this.socket.emit('pickedWinner', id);
  };

  // SETTERS
  setMouseCoords = (x, y) => this.setState({ currentMouseCoords: { x, y } });

  setRoomInfo = roomInfo => this.setState({ roomInfo });

  setCurrentColor = color => this.setState({ currentColor: color });

  setDrawing = bool => this.setState({ drawing: bool });

  setAskForUserName = bool => this.setState({ askForUserName: bool });

  setJoinRoomName = str => this.setState({ joinRoomName: str });

  setPickDifficulty = bool => this.setState({ pickDifficulty: bool });

  setPreRound = bool => this.setState({ preRound: bool });

  setGameRound = bool => this.setState({ gameRound: bool });

  setShowAlert = bool => this.setState({ showAlert: bool });

  setAskForWinner = bool => this.setState({ askForWinner: bool });

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

  makeGameRoomProps = () => {
    const {
      showAlert,
      alertInfo,
      pickDifficulty,
      wordDifficulty,
      currentWord,
      isDrawer,
      preRound,
      gameRound,
      roomInfo,
      askForWinner,
      setShowAlert
    } = this.state;

    return {
      showAlert,
      alertInfo,
      pickDifficulty,
      wordDifficulty,
      currentWord,
      isDrawer,
      preRound,
      gameRound,
      roomInfo,
      askForWinner,
      setShowAlert: this.setShowAlert,
      handleStartGameClick: this.handleStartGameClick,
      handleStartRoundClick: this.handleStartRoundClick,
      handlePickDifficultyClick: this.handlePickDifficultyClick,
      handlePickWinnerClick: this.handlePickWinnerClick
    };
  };

  render() {
    const { askForUserName, joinRoomName, joinedRoom, msgs } = this.state;

    return !joinedRoom ? (
      <JoinRoom
        roomNames={ROOM_NAMES}
        askForUserName={askForUserName}
        handleRoomItemClick={this.handleRoomItemClick}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <GameRoom {...this.makeGameRoomProps()}>
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
