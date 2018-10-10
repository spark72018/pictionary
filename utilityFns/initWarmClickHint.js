module.exports = socket =>
  socket.on('warmClickHint', timeId => {
    const { room } = socket;

    socket.to(room).emit('warmClickHint', timeId);
  });
