import React, { Component } from 'react';
import SweetAlert from 'sweetalert2-react';
import io from 'socket.io-client';
import JoinRoom from './components/JoinRoom';
import GameRoom from './components/GameRoom';
import ChatRoom from './components/ChatRoom';
import TimeLeft from './components/TimeLeft';
import DrawingBoard from './components/DrawingBoard';
import getTime from './utilityFns/getTime';
import { ROOM_NAMES, DEV_URL, DEFAULT_COLOR } from './constants';
import './App.css';

class App extends Component {
  state = {
    askForUserName: false,
    joinRoomName: '',
    joinedRoom: false,
    roomInfo: null,
    msgs: [],
    drawing: false,
    currentColor: DEFAULT_COLOR,
    currentMouseCoords: {},
    intervalId: null,
    seconds: 0,
    showAlert: false,
    alertInfo: {
      title: 'Unauthorized',
      text: 'You are not the drawer!'
    }
  };

  socket = io(DEV_URL);

  componentDidMount() {
    return this.initSocket(this.socket);
  }

  startTimer = cb =>
    cb
      ? this.setState(
          {
            intervalId: window.setInterval(this.decrementSeconds, 1000)
          },
          cb
        )
      : this.setState({
          intervalId: window.setInterval(this.decrementSeconds, 1000)
        });

  stopTimer = () => window.clearInterval(this.state.intervalId);

  decrementSeconds = () => this.setState({ seconds: this.state.seconds - 1 });

  addMsg = msgData => {
    const { msgs } = this.state;
    const length = msgs.length;

    if (length < 50) {
      return this.setState({ msgs: [...msgs, msgData] });
    } else {
      const [head, ...tail] = msgs;

      return this.setState({ msgs: [...tail, msgData] });
    }
  };

  initSocket = socket => {
    socket.on('joined room', this.handleJoinedRoom);
    socket.on('updateChat', this.handleUpdateChat);
  };

  setMouseCoords = (x, y) => this.setState({ currentMouseCoords: { x, y } });

  setCurrentColor = color => this.setState({ currentColor: color });

  setDrawing = bool => this.setState({ drawing: bool });

  setAskForUserName = bool => this.setState({ askForUserName: bool });

  setJoinRoomName = str => this.setState({ joinRoomName: str });

  handleDrawing = () => {
    console.log('handleDrawing');
  };

  handleUpdateChat = dataObj => this.addMsg(dataObj);

  handleJoinedRoom = roomInfo => {
    console.log('handleJoinedRoom');

    this.setState({
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
    console.log('handleMouseUpBoard');
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

  handleStartRound = e => {
    // check if drawer
    // if yes, emit 'start round'
    // if no, sweet alert "you are not drawer" or something similar
    //
  };

  handleResize = e => {
    console.log('handleResize called');
  };

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

  render() {
    const {
      askForUserName,
      joinRoomName,
      joinedRoom,
      msgs,
      seconds,
      showAlert,
      alertInfo
    } = this.state;

    return !joinedRoom ? (
      <JoinRoom
        roomNames={ROOM_NAMES}
        askForUserName={askForUserName}
        handleRoomItemClick={this.handleRoomItemClick}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <GameRoom>
        <SweetAlert
          showAlert={showAlert}
          title={alertInfo.title}
          text={alertInfo.text}
          onConfirm={() => this.setState({ showAlert: false })}
        />
        <ChatRoom msgs={msgs} socket={this.socket} />
        <TimeLeft seconds={seconds} />
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
