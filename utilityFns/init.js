const initJoinRoom = require('./initJoinRoom');
const initSendMessage = require('./initSendMessage');
const initStartGame = require('./initStartGame');
const initDrawing = require('./initDrawing');
const initRoundReady = require('./initRoundReady');
const initRoundWinner = require('./initRoundWinner');
const initPickedDifficulty = require('./initPickedDifficulty');

const init = (socket, state, io) => {
  initJoinRoom(socket, state, io);
  initSendMessage(socket, io);
  initStartGame(socket, state, io);
  initDrawing(socket, io);
  initRoundReady(socket, state, io);
  initRoundWinner(socket, state, io);
  initPickedDifficulty(socket);
};

module.exports = init;
