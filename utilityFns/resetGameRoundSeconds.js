module.exports = roomInfo => {
  try {
    roomInfo.roundSeconds = 60;

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
};
