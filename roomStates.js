module.exports = {
  whiskeyRoom: {
    users: [],
    playing: false,
    usersPlaying: [],
    currentDrawerIdx: 0,
    // roundSeconds: 60,
    roundSeconds: 2, // for dev purposes
    // preRoundSeconds: 10,
    preRoundSeconds: 3, // for dev purposes
    roundIntervalId: null,
    preRoundIntervalId: null
  },
  wineRoom: {
    users: [],
    playing: false,
    usersPlaying: [],
    currentDrawerIdx: 0,
    roundSeconds: 60,
    preRoundSeconds: 10,
    roundIntervalId: null,
    preRoundIntervalId: null
  }
};
