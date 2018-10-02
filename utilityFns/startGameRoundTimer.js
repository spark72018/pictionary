const startTimer = require('./startTimer');
const decrementGameRoundSecAndEmit = require('./decrementGameRoundSecAndEmit');

module.exports = (socket, roomInfo) =>
  startTimer(
    decrementGameRoundSecAndEmit(socket, roomInfo),
    1000,
    'roundIntervalId'
  );
