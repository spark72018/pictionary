const decrementPreRoundSecondsByOne = require('./decrementPreRoundSecondsByOne');
const endPreRound = require('./endPreRound');
const isZero = require('./isZero');

module.exports = (socket, roomInfo, io) => () => {
  console.log('decrementPreRoundSecAndEmit called');
  const { room } = socket;
  decrementPreRoundSecondsByOne(roomInfo);

  console.log('after preRoundSeconds decrement', roomInfo.preRoundSeconds);
  io.sockets.in(room).emit('updatePreRoundSeconds', roomInfo);

  const roundEnds = isZero(roomInfo.preRoundSeconds);
  if (roundEnds) {
    return endPreRound(socket, roomInfo, io);
  }
  // socket.emit('updatePreRoundSeconds', roomInfo);
  // return socket.broadcast.to(room).emit('updatePreRoundSeconds', roomInfo);
};
