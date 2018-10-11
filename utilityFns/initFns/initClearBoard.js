module.exports = socket =>
  socket.on('clearBoard', () => {
    const { room } = socket;
    socket.broadcast.to(room).emit('clearBoard');
  });
