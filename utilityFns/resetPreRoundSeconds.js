module.exports = roomInfo => {
  try {
    roomInfo.preRoundSeconds = 10;

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
};
