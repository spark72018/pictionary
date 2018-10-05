const stopTimer = require('./stopTimer');
const resetPreRoundSeconds = require('./resetPreRoundSeconds');
const startGameRoundTimer = require('./startGameRoundTimer');

module.exports = (socket, roomInfo, io) => {
  console.log('endPreRound called');
  const { room } = socket;
  const id = roomInfo.preRoundIntervalId;

  stopTimer(id);
  resetPreRoundSeconds(roomInfo);

  io.sockets.in(room).emit('endPreRound');
  io.sockets.in(room).emit('startGameRound');

  // socket.broadcast.to(room).emit('endPreRound');
  // socket.broadcast.to(room).emit('startGameRound');

  startGameRoundTimer(socket, roomInfo, io);
};
