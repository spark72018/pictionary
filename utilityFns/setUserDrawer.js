const setUserDrawer = (arr, idx, bool) => {
  const user = arr[idx];
  
  user.drawer = bool;

  return user;
};

module.exports = setUserDrawer;
