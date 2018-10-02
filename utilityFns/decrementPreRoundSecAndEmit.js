const decrementPreRoundSecondsByOne = require('./decrementPreRoundSecondsByOne');
const endPreRound = require('./endPreRound');
const isZero = require('./isZero');

module.exports = (socket, roomInfo) => () => {
  const { room } = socket;
  decrementPreRoundSecondsByOne(roomInfo);

  console.log('after preRoundSeconds decrement', roomInfo.preRoundSeconds);

  const roundEnds = isZero(roomInfo.preRoundSeconds);

  if (roundEnds) {
    return endPreRound(socket, roomInfo);
  }

  return socket.broadcast.to(room).emit('updatePreRoundSeconds', roomInfo);
};
