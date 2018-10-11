module.exports = socket =>
  socket.on('pickedDifficulty', difficulty => {
    return socket.to(socket.room).emit('pickedDifficulty', difficulty);
  });
