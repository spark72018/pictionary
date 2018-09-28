const initSendMessage = (socket, io) =>
  socket.on('send message', ({ msg, time }) => {
    try {
      const { username, room } = socket;

      io.sockets.in(room).emit('updateChat', { username, time, msg });
    } catch (e) {
      socket.to(room).emit('failedUpdateChat', e);
    }
  });

module.exports = initSendMessage;
