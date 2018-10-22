const initDrawing = (socket, io) =>
  socket.on('drawing', data => {
    const { room } = socket;

    io.sockets.in(room).emit('drawing', data);
  });

module.exports = initDrawing;
