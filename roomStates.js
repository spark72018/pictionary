module.exports = {
  whiskeyRoom: {
    users: [],
    playing: false,
    usersPlaying: [],
    currentDrawerIdx: 0,
    roundSeconds: 60,
    // roundSeconds: 2, // for dev purposes
    preRoundSeconds: 5,
    // preRoundSeconds: 3, // for dev purposes
    roundIntervalId: null,
    preRoundIntervalId: null
  },
  wineRoom: {
    users: [],
    playing: false,
    usersPlaying: [],
    currentDrawerIdx: 0,
    roundSeconds: 60,
    preRoundSeconds: 5,
    roundIntervalId: null,
    preRoundIntervalId: null
  }
};
