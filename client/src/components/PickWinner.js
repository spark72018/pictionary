export default ({ askForWinner, isDrawer, usersPlaying }) =>
  askForWinner ? (
    <div className="pick-winner-container">
      {isDrawer ? (
        <ul className="pick-winner-list">{usersPlaying.map(makeWinnerItem)}</ul>
      ) : (
        <h2>Drawer is picking the winner of this round.</h2>
      )}
    </div>
  ) : null;

function makeWinnerItem(username, idx) {
  return <li key={`pickwinner${idx}`}>{username}</li>;
}

// if(isDrawer) can pick winner
// else 'Drawer is picking the winner...'
// emit 'pickedWinner' to socket;
