const User = require('./User');

module.exports = function addUser({ id, username, roomName, state }) {
  try {
    state[roomName].users.push(new User(id, username));
    
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
