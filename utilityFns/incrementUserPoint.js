module.exports = num => (roomInfo, id) => {
  try {
    const winner = roomInfo.users.find(user => user.id === id);
    const currentScore = winner.score;

    winner.score = currentScore + num;

    return true;
  } catch (e) {
    console.error('incrementUserPoint error', e);
    return false;
  }
};
