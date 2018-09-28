const initDrawing = (socket, io) =>
  socket.on('drawing', data => {
    console.log('drawing data', data);
    const { room } = socket;
    io.sockets.in(room).emit('drawing', data);
  });

module.exports = initDrawing;
