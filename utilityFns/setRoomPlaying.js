const setRoomPlaying = (rooms, room, bool) => {
  try {
    rooms[room].playing = bool;

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = setRoomPlaying;
