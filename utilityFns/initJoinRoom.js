const addUser = require('./addUser');

const initJoinRoom = (socket, rooms) =>
  socket.on('join room', info => {
    const { username, joinRoomName } = info;
    console.log('username', username);
    console.log('joinRoomName', joinRoomName);

    socket.username = username;
    socket.room = joinRoomName;

    const addedUser = addUser(username, joinRoomName, rooms);

    if (addedUser) {
      socket.join(joinRoomName);
      socket.emit('joined room', rooms[joinRoomName]);
      socket.broadcast
        .to(joinRoomName)
        .emit('updateChat', `${username} has joined the room.`);
    } else {
      socket.emit('failed join');
    }
  });

module.exports = initJoinRoom;
