const decrementRoundSecondsByOne = require('./decrementRoundSecondsByOne');
const decrementPreRoundSecAndEmit = require('./decrementPreRoundSecAndEmit');
const startPreRoundTimer = require('./startPreRoundTimer');
const setRoomPlaying = require('./setRoomPlaying');

const initRoundReady = (socket, rooms) =>
  socket.on('round ready', () => {
    const { room } = socket;
    const roomInfo = rooms[room];

    setRoomPlaying(roomInfo, true);

    startPreRoundTimer(roomInfo);
  });

module.exports = initRoundReady;
