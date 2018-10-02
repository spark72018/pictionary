const removeUser = require('./removeUser');
const removeFromUsersPlaying = require('./removeFromUsersPlaying');

const initLeaveRoom = (socket, roomInfo) => {
  socket.on('leaveRoom', () => {
    const { id, room } = socket;

    removeUser(roomInfo, id);
    removeFromUsersPlaying(roomInfo, id);

    // client should find id, announce that id/name left, then set new state
    // with user removed
    return socket.broadcast.to(room).emit('userLeft', id, roomInfo);
  });
};

module.exports = initLeaveRoom;
