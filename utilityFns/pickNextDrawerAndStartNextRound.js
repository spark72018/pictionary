// imports
const pickNextDrawer = require('./pickNextDrawer');
const shuffleAndSetUsers = require('./shuffleAndSetUsers');
const setCurrentDrawerIndex = require('./setCurrentDrawerIndex');
const setUserDrawer = require('./setUserDrawer');

module.exports = (socket, roomInfo) => () => {
  const { id } = socket;
  const { usersPlaying, currentDrawerIdx: previousDrawerIdx } = roomInfo;
  let nextDrawerIdx = pickNextDrawer(roomInfo);

  if (nextDrawerIdx >= usersPlaying.length) {
    shuffleAndSetUsers(roomInfo);
    nextDrawerIdx = 0;
  }

  setUserDrawer(usersPlaying, previousDrawerIdx, false);
  setUserDrawer(usersPlaying, nextDrawerIdx, true);
  setCurrentDrawerIndex(roomInfo, nextDrawerIdx);

  return socket.broadcast.to(room).emit('room playing', { roomInfo, id });
};