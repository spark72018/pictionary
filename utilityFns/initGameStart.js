const setRoomPlaying = require('./setRoomPlaying');

const initGameStart = (socket, state) =>
  socket.on('game start', () => {
    setRoomPlaying(state, room, true);

    const { room } = socket;

    socket.broadcast.to(room).emit('room playing');
  });

module.exports = initGameStart;
