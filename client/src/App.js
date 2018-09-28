import React, { Component } from 'react';
import io from 'socket.io-client';
import JoinRoom from './components/JoinRoom';
import GameRoom from './components/GameRoom';
import ChatRoom from './components/ChatRoom';
import getTime from './utilityFns/getTime';
import { ROOM_NAMES, DEV_URL } from './constants';
import './App.css';
/*
  - if gameroom.currentlyPlaying is true, newly joined user can only spectate
  - otherwise, whoever is 'drawer' can start the game. After 15 seconds, automatically start game
  - 
  - if 'spectator' is true, cannot interact with website at all
  - if 'guesser' is true, can only chat
  - if 'drawer' is true, can draw, and end round
*/

class App extends Component {
  state = {
    askForUserName: false,
    joinRoomName: '',
    joinedRoom: false,
    roomInfo: null,
    msgs: []
  };

  socket = io(DEV_URL);

  componentDidMount() {
    this.initSocket(this.socket);
  }

  addMsg = msgData => {
    console.log('addMsg');
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

  setAskForUserName = bool => this.setState({ askForUserName: bool });

  setJoinRoomName = str => this.setState({ joinRoomName: str });

  handleUpdateChat = dataObj => {
    console.log('handleUpdateChat');
    return this.addMsg(dataObj);
  };

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

  render() {
    const { askForUserName, joinRoomName, joinedRoom, msgs } = this.state;
    const chatRoom = <ChatRoom msgs={msgs} socket={this.socket} />;
    return !joinedRoom ? (
      <JoinRoom
        roomNames={ROOM_NAMES}
        askForUserName={askForUserName}
        handleRoomItemClick={this.handleRoomItemClick}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <GameRoom chatRoom={chatRoom} />
    );
  }
}

export default App;
