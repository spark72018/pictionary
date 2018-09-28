const mongoose = require('mongoose');
const init = require('./utilityFns/init');

module.exports = app => {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  const rooms = {
    whiskeyRoom: { users: [], playing: false },
    wineRoom: { users: [], playing: false }
  };

  io.on('connection', socket => {
    console.log('user connected with id', socket.id);

    init(socket, rooms, io);

    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  const PORT = process.env.PORT || 8000;

  http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
};
