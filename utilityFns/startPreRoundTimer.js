const startTimer = require('./startTimer');
const decrementPreRoundSecAndEmit = require('./decrementFns/decrementPreRoundSecAndEmit');

module.exports = (socket, roomInfo, io) =>
  startTimer(
    decrementPreRoundSecAndEmit(socket, roomInfo, io),
    1000,
    'preRoundIntervalId'
  )(roomInfo);
