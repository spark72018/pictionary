const startTimer = require('./startTimer');
const decrementPreRoundSecAndEmit = require('./decrementPreRoundSecAndEmit');

module.exports = (socket, roomInfo) =>
  startTimer(
    decrementPreRoundSecAndEmit(socket, roomInfo),
    1000,
    'preRoundIntervalId'
  );
