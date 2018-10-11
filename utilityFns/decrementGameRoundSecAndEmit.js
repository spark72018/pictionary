const decrementGameRoundSecondsByOne = require('./decrementGameRoundSecondsByOne');
const endGameRound = require('./endGameRound');
const isZero = require('./isZero');

module.exports = (socket, roomInfo, io) => () => {
  console.log('decrementGameRoundSecAndEmit called');
  const { room } = socket;

  decrementGameRoundSecondsByOne(roomInfo);

  console.log('after roundSeconds decrement', roomInfo.roundSeconds);
  io.sockets.in(room).emit('updateGameRoundSeconds', roomInfo);

  const roundEnds = isZero(roomInfo.roundSeconds);
  if (roundEnds) {
    return endGameRound(socket, roomInfo, io);
  }
};
