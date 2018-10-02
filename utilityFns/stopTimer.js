module.exports = intervalId => {
  try {
    clearInterval(intervalId);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
};
