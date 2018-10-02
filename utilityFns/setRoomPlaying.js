const setRoomPlaying = (room, bool) => {
  try {
    room.playing = bool;

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = setRoomPlaying;
