module.exports = property => num => roomState => {
  try {
    const previousValue = roomState[property];

    roomState[property] = previousValue - num;

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
