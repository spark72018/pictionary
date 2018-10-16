const decrementRoundSecondsByOne = require('../decrementFns/decrementRoundSecondsByOne');
const decrementPreRoundSecAndEmit = require('../decrementFns/decrementPreRoundSecAndEmit');
const startPreRoundTimer = require('../startPreRoundTimer');
const setRoomPlaying = require('../setRoomPlaying');

const initRoundReady = (socket, rooms, io) =>
  socket.on('round ready', () => {
    console.log('round ready event received');
    const { room } = socket;
    const roomInfo = rooms[room];

    setRoomPlaying(roomInfo, true);

    startPreRoundTimer(socket, roomInfo, io);
  });

module.exports = initRoundReady;
