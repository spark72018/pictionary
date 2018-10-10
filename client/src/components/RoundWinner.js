import React from 'react';

export default ({ showWinner, winnerName }) =>
  showWinner ? (
    <div className="round-winner-container">
      <h4>{`${!winnerName ? 'No one' : winnerName} won this round`}</h4>
    </div>
  ) : null;
