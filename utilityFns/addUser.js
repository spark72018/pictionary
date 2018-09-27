const User = require('./User');

module.exports = function addUser(username, roomName, state) {
  try {
    state[roomName].users.push(new User(username));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
