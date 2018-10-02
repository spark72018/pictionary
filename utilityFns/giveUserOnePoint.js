module.exports = (roomInfo, id) => {
  const winner = roomInfo.users.find(user => user.id === id);
  const currentScore = winner.score;

  winner.score = currentScore + 1;
};
