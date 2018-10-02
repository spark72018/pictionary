module.exports = roomInfo => {
  const { currentDrawerIdx } = roomInfo;
  const nextDrawerIdx = currentDrawerIdx + 1;

  roomInfo.currentDrawerIdx = nextDrawerIdx;

  return nextDrawerIdx;
};
