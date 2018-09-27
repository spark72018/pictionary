module.exports = class User {
  constructor(
    name,
    score = 0,
    drawer = false,
    guesser = false,
    spectator = true
  ) {
    this.name = name;
    this.score = score;
    this.drawer = drawer;
    this.guesser = guesser;
    this.spectator = spectator;
  }
};
