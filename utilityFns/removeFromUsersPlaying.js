const isNotId = require('./isNotId');

module.exports = (roomInfo, userId) => {
  const { usersPlaying: currentlyPlaying } = roomInfo;

  roomInfo.usersPlaying = currentlyPlaying.filter(isNotId(userId));

  return roomInfo;
};
