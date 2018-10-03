const endGameRound = require('./endGameRound');

const initEndGameRound = (socket, state) => {
  socket.on('endGameRound', winner => {
    const { room } = socket;

    endGameRound(socket, state[room]);

    return socket.broadcast.to(room).emit('endGameRound');
  });
};

module.exports = initGameEnd;
