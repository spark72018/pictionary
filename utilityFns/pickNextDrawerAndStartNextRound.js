// imports
const pickNextDrawer = require('./pickNextDrawer');
const shuffleAndSetUsers = require('./shuffleAndSetUsers');
const setCurrentDrawerIndex = require('./setCurrentDrawerIndex');

module.exports = (socket, roomInfo) => () => {
  const { id } = socket;
  let nextDrawerIdx = pickNextDrawer(roomInfo);

  if (nextDrawerIdx >= roomInfo.usersPlaying.length) {
    shuffleAndSetUsers(roomInfo);
    nextDrawerIdx = 0;
  }

  setCurrentDrawerIndex(roomInfo, nextDrawerIdx);

  return socket.broadcast.to(room).emit('room playing', { roomInfo, id });
};
