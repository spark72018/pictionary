const initJoinRoom = require('./initJoinRoom');
const initSendMessage = require('./initSendMessage');
const initGameStart = require('./initGameStart');

const init = (socket, state, io) => {
  initJoinRoom(socket, state);
  initSendMessage(socket, io);
  initGameStart(socket, state);
};

module.exports = init;
