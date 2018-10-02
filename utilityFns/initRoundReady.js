const decrementRoundSecondsByOne = require('./decrementRoundSecondsByOne');
const decrementPreRoundSecAndEmit = require('./decrementPreRoundSecAndEmit');
const startPreRoundTimer = require('./startPreRoundTimer');

const initRoundReady = (socket, rooms) =>
  socket.on('round ready', () => {
    const { room } = socket;
    const roomInfo = rooms[room];

    startPreRoundTimer(roomInfo);
  });

module.exports = initRoundReady;
