const initSendMessage = (socket, io) =>
  socket.on('send message', data => {
    // data = {username, time, msg }
    try {
      const { username, room } = socket;

      io.sockets.in(room).emit('updateChat', { ...data, username });
    } catch (e) {
      socket.to(room).emit('failedUpdateChat', e);
    }
  });

module.exports = initSendMessage;
