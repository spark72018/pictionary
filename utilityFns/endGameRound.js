const stopTimer = require('./stopTimer');
const resetGameRoundSeconds = require('./resetGameRoundSeconds');
const startGameRoundTimer = require('./startGameRoundTimer');
const setRoomPlaying = require('./setRoomPlaying');

module.exports = (socket, roomInfo) => {
  const { room } = socket;
  const id = roomInfo.roundIntervalId;

  stopTimer(id);
  resetGameRoundSeconds(roomInfo);
  setRoomPlaying(roomInfo, false);
  // drawer will pick winner, which will emit 'pickedWinner' to socket
  return socket.broadcast.to(room).emit('endGameRound');
};
