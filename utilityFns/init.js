const initJoinRoom = require('./initJoinRoom');
const initSendMessage = require('./initSendMessage');
const initStartGame = require('./initStartGame');
const initDrawing = require('./initDrawing');
const initRoundReady = require('./initRoundReady');
const initRoundWinner = require('./initRoundWinner');
const initPickedDifficulty = require('./initPickedDifficulty');

const init = (socket, state, io) => {
  initJoinRoom(socket, state);
  initSendMessage(socket, io);
  initStartGame(socket, state);
  initDrawing(socket, io);
  initRoundReady(socket, state);
  initRoundWinner(socket, state);
  initPickedDifficulty(socket);
};

module.exports = init;
