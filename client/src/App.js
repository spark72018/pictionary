import React, { Component } from 'react';
import io from 'socket.io-client';
import JoinRoom from './components/JoinRoom';
import GameRoom from './components/GameRoom';
import ChatRoom from './components/ChatRoom';
import DrawingBoard from './components/DrawingBoard';
import getTime from './utilityFns/getTime';
import getRandomElement from './utilityFns/getRandomElement';
import {
  ROOMS_INFO,
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
    announceDrawer: false,
    joinRoomName: '',
    joinedRoom: false,
    socketId: '',
    roomInfo: null,
    msgs: [],
    amSpectator: false,
    previousWords: [],
    pickDifficulty: false,
    // pickDifficulty: true, // for dev
    drawing: false,
    currentColor: DEFAULT_COLOR,
    currentMouseCoords: {},
    currentWord: '',
    intervalId: null,
    showAlert: false,
    showWinner: false,
    showPlayerScores: false,
    isDrawer: false,
    // isDrawer: true, // for dev
    alertInfo: {
      title: 'Unauthorized',
      text: 'You are not the drawer!'
    },
    wordDifficulty: '',
    easyWords: EASY_WORDS,
    mediumWords: MEDIUM_WORDS,
    hardWords: HARD_WORDS,
    preRound: false,
    gameRound: false,
    winnerId: ''
  };

  socket = io(DEV_URL);

  componentDidMount() {
    return this.initSocket(this.socket);
  }

  togglePlayerScores = () =>
    this.setState({ showPlayerScores: !this.state.showPlayerScores });

  initSocket = socket => {
    socket.on('joined room', this.handleJoinedRoom);
    socket.on('yourSocketId', this.handleYourSocketId);
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
    socket.on('announceDrawer', this.handleAnnounceDrawer);
    socket.on('warmClickHint', this.handleWarmClickHint);
    socket.on('error', this.handleSocketError);
    // TODO
    // socket.on('userLeft', this.handleUserLeft);
  };

  setAnnounceDrawer = bool => this.setState({ announceDrawer: bool });

  showCurrentDrawer = drawerName => {
    this.setAnnounceDrawer(true);
    // this.setCurrentDrawerName(drawerName);
  };

  setWinnerId = winnerId => this.setState({ winnerId });

  updateWarmMsgs = (msgs, timeId) =>
    msgs.map(
      msg => (msg.timeId !== timeId ? msg : { ...msg, warm: !msg.warm })
    );

  // SOCKET HANDLERS
  handleWarmClickHint = timeId => {
    const { msgs } = this.state;
    const updatedMsgs = this.updateWarmMsgs(msgs, timeId);

    return this.setState({ msgs: updatedMsgs });
  };
  handleAnnounceDrawer = roomInfo => {
    const { usersPlaying, currentDrawerIdx } = roomInfo;
    const currentDrawer = usersPlaying[currentDrawerIdx];
    const { name: drawerName } = currentDrawer;

    this.showCurrentDrawer(drawerName);
  };
  handleSocketError = e => console.error(e);
  handleEndPreRound = () => this.setPreRound(false);
  handleUpdateChat = dataObj => {
    const withWarmAttribute = { ...dataObj, warm: false };

    return this.addMsg(withWarmAttribute);
  };
  handlePickedDifficulty = difficulty => {
    console.log('pickedDifficulty socket event', difficulty);
    this.setPickDifficulty(false);
    this.setState({ wordDifficulty: difficulty });

    window.setTimeout(() => {
      this.setState({ wordDifficulty: '' });
    }, 3000);
  };

  handleAnnounceWinner = winnerId => {
    console.log('handleAnnounceWinner winnerId', winnerId);
    this.setAskForWinner(false);
    this.setShowWinner(true);
    this.setWinnerId(winnerId);
    this.setState({ currentWord: '' });

    window.setTimeout(() => {
      this.setShowWinner(false);
      this.setWinnerId('');
    }, 3000);
  };

  handleYourSocketId = id => this.setState({ socketId: id });

  handleStartGameRound = () => {
    this.setPreRound(false);
    this.setGameRound(true);
  };

  handleUpdateGameRoundSeconds = roomInfo => this.setRoomInfo(roomInfo);

  handleRoomPlaying = roomInfo => {
    console.log('handleRoomPlaying', roomInfo);
    const { socketId } = this.state;
    this.setState({ roomInfo });

    const { usersPlaying, currentDrawerIdx } = roomInfo;
    const currentDrawer = usersPlaying[currentDrawerIdx];

    console.log('handleRoomPlaying id', socketId);
    console.log('handleRoomPlaying currentDrawer info', currentDrawer);

    if (currentDrawer.id === socketId) {
      this.setState({ isDrawer: true });
    } else {
      this.setState({ isDrawer: false });
    }
    this.setPickDifficulty(true);
  };

  handleJoinedRoom = ({ id, roomInfo }) => {
    const isMe = this.state.socketId === id;
    const inUsersPlaying = roomInfo.usersPlaying.find(user => user.id === id);
    const includedInRound = !roomInfo.playing && inUsersPlaying;
    const isMeInfo = isMe
      ? {
          joinedRoom: true,
          msgs: [
            {
              username: '',
              time: getTime(),
              msg: 'You have successfully joined!'
            }
          ]
        }
      : {};

    return this.setState({
      roomInfo,
      amSpectator: includedInRound ? true : false,
      ...isMeInfo
    });
  };

  handleUpdatePreRoundSeconds = roomInfo => {
    this.setPreRound(true);
    this.setState({ roomInfo });
  };

  // CLICK HANDLERS
  handleStartGameClick = e => {
    const { roomInfo } = this.state;
    const notEnoughPlayers = roomInfo.users.length < 2;
    const aGameInSession = roomInfo.playing;

    if (notEnoughPlayers || aGameInSession) {
      const alertText =
        (notEnoughPlayers &&
          'You need at least two players to start the game!') ||
        (aGameInSession && 'There is a game already in session.');

      return this.showCannotStartGameAlert(alertText);
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

  handleChatMessageClick = e => {
    if (!this.state.isDrawer || !e.target.dataset.timeid) return;
    const { msgs } = this.state;

    // helper function
    const getParsedTimeId = e => parseInt(e.target.dataset.timeid, 10);

    const parsedId = getParsedTimeId(e);
    this.socket.emit('warmClickHint', parsedId);

    const updatedMsgs = this.updateWarmMsgs(msgs, parsedId);

    return this.setState({ msgs: updatedMsgs });
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

  setShowWinner = bool => this.setState({ showWinner: bool });

  // FUNCTIONS THAT ADD TO STATE
  addToPreviousWords = word => {
    const { previousWords } = this.state;

    return this.setState({ previousWords: [...previousWords, word] });
  };

  addMsg = msgData => {
    console.log('addMsg', msgData);
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
  showCannotStartGameAlert = text =>
    this.setState(
      {
        showAlert: true,
        alertInfo: {
          title: 'Cannot start game',
          text
        }
      },
      () => console.log('showCannotStartGameAlert called', this.state)
    );

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
    if (!this.state.isDrawer) return;

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
      showWinner,
      showPlayerScores,
      winnerId,
      askForWinner,
      announceDrawer,
      setShowAlert
    } = this.state;
    const currentDrawerName =
      roomInfo && roomInfo.usersPlaying.length > 1
        ? roomInfo.usersPlaying[roomInfo.currentDrawerIdx].name
        : '';

    return {
      showAlert,
      alertInfo,
      pickDifficulty,
      wordDifficulty,
      currentWord,
      currentDrawerName,
      isDrawer,
      preRound,
      gameRound,
      roomInfo,
      askForWinner,
      showWinner,
      showPlayerScores,
      winnerId,
      announceDrawer,
      setShowAlert: this.setShowAlert,
      togglePlayerScores: this.togglePlayerScores,
      handleStartGameClick: this.handleStartGameClick,
      handlePickDifficultyClick: this.handlePickDifficultyClick,
      handlePickWinnerClick: this.handlePickWinnerClick
    };
  };

  makeDrawingBoardProps = () => ({
    isDrawer: this.state.isDrawer,
    handleMouseMove: this.handleMouseMoveBoard,
    handleMouseDown: this.handleMouseDownBoard,
    handleMouseUp: this.handleMouseUpBoard,
    handleMouseOut: this.handleMouseUpBoard,
    drawLine: this.drawLine,
    socket: this.socket
  });

  render() {
    const { askForUserName, joinRoomName, joinedRoom, msgs } = this.state;

    return !joinedRoom ? (
      <JoinRoom
        roomsInfo={ROOMS_INFO}
        askForUserName={askForUserName}
        handleRoomItemClick={this.handleRoomItemClick}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <GameRoom {...this.makeGameRoomProps()}>
        <div className="main-container">
          <DrawingBoard {...this.makeDrawingBoardProps()} />
          <ChatRoom
            msgs={msgs}
            socket={this.socket}
            handleChatMessageClick={this.handleChatMessageClick}
          />
        </div>
      </GameRoom>
    );
  }
}

export default App;
