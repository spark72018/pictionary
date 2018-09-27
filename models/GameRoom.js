const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Player = require('./Player');

const gameRoomSchema = new Schema({
  roomName: String,
  currentyPlaying: Boolean,
  currentPlayers: [Player]
});

mongoose.model('gameRooms', gameRoomSchema);
