import React from 'react';

export default ({
  askForWinner,
  isDrawer,
  usersPlaying,
  handlePickWinnerClick
}) => {
  return askForWinner ? (
    <div className="pick-winner-container">
      {isDrawer ? (
        <ul className="pick-winner-list">
          {makePickWinnerList(usersPlaying, handlePickWinnerClick)}
        </ul>
      ) : (
        <h2>Drawer is picking the winner of this round.</h2>
      )}
    </div>
  ) : null;
};

function makePickWinnerList(userList, clickHandler) {
  const makeWinnerItem = withHandler(clickHandler);
  const playerList = userList.map(makeWinnerItem);
  const noWinnerItem = (
    <li key="noWinner" data-id={null} onClick={clickHandler}>
      No one got it.
    </li>
  );

  return [...playerList, noWinnerItem];
}

function withHandler(clickHandler) {
  return function(userInfo, idx) {
    return (
      <li key={`pickwinner${idx}`} data-id={userInfo.id} onClick={clickHandler}>
        {userInfo.name}
      </li>
    );
  };
}
