const initJoinRoom = require('./initJoinRoom');
const initSendMessage = require('./initSendMessage');
const initStartGame = require('./initStartGame');
const initDrawing = require('./initDrawing');

const init = (socket, state, io) => {
  initJoinRoom(socket, state);
  initSendMessage(socket, io);
  initStartGame(socket, state);
  initDrawing(socket, io);
};

module.exports = init;
