const giveUserOnePoint = require('./giveUserOnePoint');
const pickNextDrawerAndStartNextRound = require('./pickNextDrawerAndStartNextRound');

module.exports = (socket, state, io) =>
  socket.on('pickedWinner', winnerId => {
    const { room } = socket;
    const roomInfo = state[room];

    if (winnerId) {
      // give winner a point, pick next drawer and start preRound
      giveUserOnePoint(roomInfo, winnerId);

      io.sockets.in(room).emit('announceWinner', winnerId);
      // socket.broadcast.to(room).emit('announceWinner', winnerId);
    } else {
      io.sockets.in(room).emit('announceWinner', null);
      // socket.broadcast.to(room).emit('announceWinner', null);
    }

    return setTimeout(
      pickNextDrawerAndStartNextRound(socket, roomInfo, io),
      3000
    );

    // when picking next drawer, if last drawer was last el of array, shuffle array and
    // start from beginning

    // currentDrawerIdx;
    // setPreviousDrawerIndex(roomInfo, 0);
    // setUserDrawer(roomInfo.users, id, true);
  });
