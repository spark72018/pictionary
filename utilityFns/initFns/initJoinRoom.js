const addUser = require('../addUser');

const initJoinRoom = (socket, rooms, io) =>
  socket.on('join room', info => {
    const { username, joinRoomName: roomName, time } = info;
    const { id } = socket;

    socket.username = username;
    socket.room = roomName;

    const userData = { id, username, roomName, state: rooms };
    const addedUser = addUser(userData);
    const roomInfo = rooms[roomName];

    if (addedUser) {
      const joinedRoomInfo = { id, roomInfo };

      socket.join(roomName);
      socket.emit('yourSocketId', id);
      socket.emit('joined room', joinedRoomInfo);
      socket.broadcast.to(roomName).emit('joined room', joinedRoomInfo);
      // io.sockets.in(roomName).emit('joined room', roomInfo);

      const res = {
        username: '',
        time,
        msg: `${username} has joined the room.`
      };

      return socket.broadcast.to(roomName).emit('updateChat', res);
    } else {
      return socket.broadcast.to(roomName).emit('failedJoin');
    }
  });

module.exports = initJoinRoom;
