const initJoinRoom = require('./initJoinRoom');
const initSendMessage = require('./initSendMessage');
const initGameStart = require('./initGameStart');

const init = (socket, state) => {
    initJoinRoom(socket, state);
    initSendMessage(socket);
    initGameStart(socket, state);
}