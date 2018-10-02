module.exports = roomInfo => {
  const { users } = roomInfo;

  roomInfo.usersPlaying = [...users];
  
  return roomInfo;
};
