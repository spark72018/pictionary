const initSendMessage = socket =>
  socket.on('send message', msg => {
    console.log('message event');
    const { username, room } = socket;
    console.log('username, room', username, room);

    socket.broadcast.to(room).emit('updateChat', { username, msg });
  });

module.exports = initSendMessage;
