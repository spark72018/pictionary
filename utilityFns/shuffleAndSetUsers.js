const shuffle = require('./shuffle');

const shuffleAndSetUsers = (state, room) => {
  const users = [...state[room].users];
  const shuffledUsers = shuffle(users);

  state[room].usersPlaying = shuffledUsers;
};
