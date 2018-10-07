const pickNextDrawer = require('./pickNextDrawer');
const shuffleAndSetUsers = require('./shuffleAndSetUsers');
const setCurrentDrawerIndex = require('./setCurrentDrawerIndex');
const setUserDrawer = require('./setUserDrawer');
const updateUsersPlaying = require('./updateUsersPlaying');

module.exports = (socket, roomInfo, io) => () => {
  console.log('pickNextDrawerAndStartNextRound called');
  const { id, room } = socket;
  const { usersPlaying, currentDrawerIdx: previousDrawerIdx } = roomInfo;
  let nextDrawerIdx = pickNextDrawer(roomInfo);

  if (nextDrawerIdx >= usersPlaying.length) {
    shuffleAndSetUsers(roomInfo);
    nextDrawerIdx = 0;
  }

  setUserDrawer(usersPlaying, previousDrawerIdx, false);
  setUserDrawer(usersPlaying, nextDrawerIdx, true);
  updateUsersPlaying(roomInfo); // add any users who joined in middle of round
  setCurrentDrawerIndex(roomInfo, nextDrawerIdx);

  return io.sockets.in(room).emit('room playing', roomInfo);
};
