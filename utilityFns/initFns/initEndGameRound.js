const endGameRound = require('../endGameRound');

const initEndGameRound = (socket, state, io) => {
  socket.on('endGameRound', winner => {
    const { room } = socket;

    endGameRound(socket, state[room], io);

    return io.sockets.in(room).emit('endGameRound');
  });
};

module.exports = initEndGameRound;
