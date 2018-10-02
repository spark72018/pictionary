module.exports = (cb, delay, property) => state => {
  try {
    state[property] = setInterval(cb, delay);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
};
