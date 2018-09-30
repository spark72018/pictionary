const setUserDrawer = (arr, id, bool) => {
  const user = arr.find(info => info.id === id);
  user.drawer = bool;

  console.log('setUserDrawer called', user);
  return user;
};

module.exports = setUserDrawer;
