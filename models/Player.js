const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
  playerName: String,
  score: Number
});

mongoose.model('players', playerSchema);
