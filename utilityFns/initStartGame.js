const setRoomPlaying = require('./setRoomPlaying');
const shuffleAndSetUsers = require('./shuffleAndSetUsers');
const setUserDrawer = require('./setUserDrawer');
const updateUsersPlaying = require('./updateUsersPlaying');

const initStartGame = (socket, state) =>
  socket.on('start game', () => {
    const { id, room } = socket;
    const roomInfo = state[room];
    const { users, currentDrawerIdx } = roomInfo;

    setRoomPlaying(roomInfo, true);
    shuffleAndSetUsers(roomInfo);
    setUserDrawer(users, currentDrawerIdx, true);
    updateUsersPlaying(roomInfo);

    return socket.broadcast.to(room).emit('room playing', { roomInfo, id });
  });

module.exports = initStartGame;
