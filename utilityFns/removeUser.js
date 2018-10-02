const isNotId = require('./isNotId');

module.exports = (roomInfo, userId) => {
  const { users: currentUsers } = roomInfo;

  roomInfo.users = currentUsers.filter(isNotId(userId));

  return roomInfo;
};
