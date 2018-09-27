const initGameEnd = (socket, state) => {
  socket.on('game end', winner => {
    const { room } = socket;
  });
};

module.exports = initGameEnd;
