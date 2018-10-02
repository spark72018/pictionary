const setRoomPlaying = require('./setRoomPlaying');
const shuffleAndSetUsers = require('./shuffleAndSetUsers');
const setPreviousDrawerIndex = require('./setCurrentDrawerIndex');
const setUserDrawer = require('./setUserDrawer');

const initStartGame = (socket, state) =>
  socket.on('start game', () => {
    const { id, room } = socket;
    const roomInfo = state[room];

    setRoomPlaying(roomInfo, true);
    shuffleAndSetUsers(roomInfo);
    // setPreviousDrawerIndex(roomInfo, 0);
    setUserDrawer(roomInfo.users, roomInfo.currentDrawerIdx, true);

    return socket.broadcast.to(room).emit('room playing', { roomInfo, id });
  });

module.exports = initStartGame;
