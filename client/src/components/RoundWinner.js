import React from 'react';

export default ({ showWinner, winnerName }) =>
  showWinner ? (
    <div>
      <h1>{`${winnerName} won this round`}</h1>
    </div>
  ) : null;
