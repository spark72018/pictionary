const startTimer = require('./startTimer');
const decrementGameRoundSecAndEmit = require('./decrementGameRoundSecAndEmit');

module.exports = (socket, roomInfo, io) =>
  startTimer(
    decrementGameRoundSecAndEmit(socket, roomInfo, io),
    1000,
    'roundIntervalId'
  )(roomInfo);
