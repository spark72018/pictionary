const mongoose = require('mongoose');
const init = require('./utilityFns/initFns/init');
const rooms = require('./roomStates');
const removeUser = require('./utilityFns/removeUser');
const removeFromUsersPlaying = require('./utilityFns/removeFromUsersPlaying');

module.exports = app => {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  // io.set('transports', ['websocket']);

  io.on('connection', socket => {
    console.log('user connected with id', socket.id);

    init(socket, rooms, io);

    socket.on('disconnect', () => {
      const { id, room } = socket;
      console.log('left room', id);
      if (room) {
        const roomInfo = rooms[room];

        removeUser(roomInfo, id);
        removeFromUsersPlaying(roomInfo, id);

        // client should find id, announce that id/name left, then set new state
        // with user removed
        return socket.broadcast.to(room).emit('userLeft', id, roomInfo);
      }
    });
  });

  const PORT = process.env.PORT || 8000;

  http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};
