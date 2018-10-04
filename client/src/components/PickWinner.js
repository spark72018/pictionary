export default ({
  askForWinner,
  isDrawer,
  usersPlaying,
  handlePickWinnerClick
}) => {
  return askForWinner ? (
    <div className="pick-winner-container">
      {isDrawer ? (
        <ul className="pick-winner-list">{makePickWinnerList(usersPlaying)}</ul>
      ) : (
        <h2>Drawer is picking the winner of this round.</h2>
      )}
    </div>
  ) : null;
};

function makePickWinnerList(userList) {
  const noWinnerItem = (
    <li key="noWinner" data-id={null} onClick={handlePickWinnerClick}>
      No one got it.
    </li>
  );
  const playerList = userList.map(makeWinnerItem);

  return [...playerList, noWinnerItem];
}

function makeWinnerItem(userInfo, idx) {
  return (
    <li
      key={`pickwinner${idx}`}
      data-id={userInfo.id}
      onClick={handlePickWinnerClick}
    >
      {userInfo.name}
    </li>
  );
}
