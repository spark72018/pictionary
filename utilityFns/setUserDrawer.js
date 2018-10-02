const setUserDrawer = (arr, idx, bool) => {
  const user = arr[idx];
  user.drawer = bool;

  console.log('setUserDrawer called', user);
  return user;
};

module.exports = setUserDrawer;
