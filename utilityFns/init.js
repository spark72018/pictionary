const initJoinRoom = require('./initJoinRoom');
const initSendMessage = require('./initSendMessage');
const initGameStart = require('./initGameStart');
const initDrawing = require('./initDrawing');

const init = (socket, state, io) => {
  initJoinRoom(socket, state);
  initSendMessage(socket, io);
  initGameStart(socket, state);
  initDrawing(socket, io);
};

module.exports = init;
