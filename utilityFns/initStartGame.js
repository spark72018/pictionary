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

    const { usersPlaying, currentDrawerIdx } = roomInfo;
    setUserDrawer(usersPlaying, currentDrawerIdx, true);

    io.sockets.in(room).emit('announceDrawer', roomInfo);

    return io.sockets.in(room).emit('room playing', roomInfo);
  });

module.exports = initStartGame;
