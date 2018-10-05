const shuffle = require('./shuffle');

const shuffleAndSetUsers = roomInfo => {
  const users = [...roomInfo.users];
  const shuffledUsers = shuffle(users);

  roomInfo.usersPlaying = shuffledUsers;
};

module.exports = shuffleAndSetUsers;
