const addUser = require('./addUser');

const initJoinRoom = (socket, rooms) =>
  socket.on('join room', info => {
    const { username, joinRoomName: roomName } = info;
    console.log('username', username);
    console.log('roomName', roomName);
    const { id } = socket;
    socket.username = username;
    socket.room = roomName;

    const userData = { id, username, roomName, state: rooms };

    const addedUser = addUser(userData);

    if (addedUser) {
      socket.join(roomName);
      socket.emit('joined room', rooms[roomName]);
      socket.broadcast
        .to(roomName)
        .emit('updateChat', `${username} has joined the room.`);
    } else {
      socket.emit('failed join');
    }
  });

module.exports = initJoinRoom;
