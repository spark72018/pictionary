const stopTimer = require('./stopTimer');
const resetPreRoundSeconds = require('./resetPreRoundSeconds');
const startGameRoundTimer = require('./startGameRoundTimer');

module.exports = (socket, roomInfo) => {
  const { room } = socket;
  const id = roomInfo.preRoundIntervalId;

  stopTimer(id);
  resetPreRoundSeconds(roomInfo);
  startGameRoundTimer(socket, roomInfo);

  socket.broadcast.to(room).emit('startGameRound');
};
