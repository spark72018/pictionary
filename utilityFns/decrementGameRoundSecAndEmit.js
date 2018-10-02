const decrementGameRoundSecondsByOne = require('./decrementGameRoundSecondsByOne');
const endGameRound = require('./endGameRound');
const isZero = require('./isZero');

module.exports = (socket, roomInfo) => () => {
  const { room } = socket;

  decrementGameRoundSecondsByOne(roomInfo);

  console.log('after roundSeconds decrement', roomInfo.roundSeconds);

  const roundEnds = isZero(roomInfo.roundSeconds);

  if (roundEnds) {
    return endGameRound(socket, roomInfo);
  }

  return socket.broadcast
    .to(room)
    .emit('updateGameRoundSeconds', roomInfo);
};
