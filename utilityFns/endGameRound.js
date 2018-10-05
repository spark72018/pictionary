const stopTimer = require('./stopTimer');
const resetGameRoundSeconds = require('./resetGameRoundSeconds');
const startGameRoundTimer = require('./startGameRoundTimer');
const setRoomPlaying = require('./setRoomPlaying');

module.exports = (socket, roomInfo, io) => {
  console.log('endGameRound called');
  const { room } = socket;
  const id = roomInfo.roundIntervalId;

  stopTimer(id);
  resetGameRoundSeconds(roomInfo);
  setRoomPlaying(roomInfo, false);
  // drawer will pick winner, which will emit 'pickedWinner' to socket
  return io.sockets.in(room).emit('endGameRound');
};
