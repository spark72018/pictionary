const setRoomPlaying = require('./setRoomPlaying');
const shuffleAndSetUsers = require('./shuffleAndSetUsers');
const setPreviousDrawerIndex = require('./setCurrentDrawerIndex');
const setUserDrawer = require('./setUserDrawer');

const initStartGame = (socket, state) =>
  socket.on('start game', () => {
    const { id, room } = socket;

    setRoomPlaying(state, room, true);
    shuffleAndSetUsers(state, room);
    setPreviousDrawerIndex(state[room], 0);
    setUserDrawer(state[room].users, id, true);

    socket.broadcast
      .to(room)
      .emit('room playing', { roomInfo: state[room], id });
  });

module.exports = initStartGame;
