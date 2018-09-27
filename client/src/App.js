import React, { Component } from 'react';
import io from 'socket.io-client';
import JoinRoom from './components/JoinRoom';
import GameRoom from './components/GameRoom';
import { ROOM_NAMES, DEV_URL } from './constants';
import './App.css';

/*
  - User connects, show all GameRooms
  - if User clicks one, prompt for Username
  - emit 'username created' to backend with mongoose id of gameroom and username
  - findOneandupdate gameroom id
  - create new Player;
  - $push to gameroom currentPlayers
  - server socket.emit 'successfully joined' to user
  - server socket.broadcast.emit 'user joined' with username
*/

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
    roomInfo: null
  };

  socket = io(DEV_URL);

  componentDidMount() {
    this.initSocket(this.socket);
  }

  initSocket = socket => {
    socket.on('joined room', this.handleJoinedRoom);
  };

  handleJoinedRoom = roomInfo => {
    console.log('handleJoinedRoom');
    this.setState({ joinedRoom: true, roomInfo });
  };

  setAskForUserName = bool => this.setState({ askForUserName: bool });

  setJoinRoomName = str => this.setState({ joinRoomName: str });

  handleSubmit = (e, username) => {
    e.preventDefault();
    const { joinRoomName } = this.state;

    this.socket.emit('join room', { username, joinRoomName });
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
    const { askForUserName, joinRoomName, joinedRoom } = this.state;
    return !joinedRoom ? (
      <JoinRoom
        roomNames={ROOM_NAMES}
        askForUserName={askForUserName}
        handleRoomItemClick={this.handleRoomItemClick}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <GameRoom />
    );
  }
}

export default App;
