const setRoomPlaying = require('./setRoomPlaying');
const shuffleAndSetUsers = require('./shuffleAndSetUsers');
const setUserDrawer = require('./setUserDrawer');
const updateUsersPlaying = require('./updateUsersPlaying');
//
const initStartGame = (socket, state, io) =>
  socket.on('start game', () => {
    const { id, room } = socket;
    const roomInfo = state[room];

    setRoomPlaying(roomInfo, true);
    shuffleAndSetUsers(roomInfo);
    updateUsersPlaying(roomInfo);
    setUserDrawer(roomInfo.usersPlaying, roomInfo.currentDrawerIdx, true);

    return io.sockets.in(room).emit('room playing', roomInfo);
    // return socket.broadcast.to(room).emit('room playing', { roomInfo, id });
  });

module.exports = initStartGame;
