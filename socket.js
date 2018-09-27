const mongoose = require('mongoose');
const initJoinRoom = require('./utilityFns/initJoinRoom');
const initSendMessage = require('./utilityFns/initSendMessage');
const GameRoom = mongoose.model('gameRooms');

module.exports = app => {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  const rooms = {
    whiskeyRoom: { users: [], playing: false },
    wineRoom: { users: [], playing: false }
  };

  io.on('connection', socket => {
    console.log('user connected with id', socket.id);

    // set up listening for 'join room' event
    initJoinRoom(socket, rooms);

    // set up listening for 'send message' event
    initSendMessage(socket);

    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  const PORT = process.env.PORT || 8000;

  http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};
