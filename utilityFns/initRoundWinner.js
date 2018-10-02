const giveUserOnePoint = require('./giveUserOnePoint');
const pickNextDrawerAndStartNextRound = require('./pickNextDrawerAndStartNextRound');

module.exports = (socket, state) =>
  socket.on('pickedWinner', winnerId => {
    const { room } = socket;
    if (winnerId) {
      // give winner a point, pick next drawer and start preRound
      giveUserOnePoint(state[room], winnerId);

      socket.broadcast.to(room).emit('announceWinner', winnerId);
    }

    return setTimeout(pickNextDrawerAndStartNextRound(socket, state), 3000);

    // when picking next drawer, if last drawer was last el of array, shuffle array and
    // start from beginning

    // currentDrawerIdx;
    // setPreviousDrawerIndex(roomInfo, 0);
    // setUserDrawer(roomInfo.users, id, true);
  });
