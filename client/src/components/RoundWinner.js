import React from 'react';

export default ({ showWinner, winnerName }) =>
  showWinner ? (
    <div className="round-winner-container">
      <h1>{`${!winnerName ? 'No one' : winnerName} won this round`}</h1>
    </div>
  ) : null;
