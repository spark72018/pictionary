import React from 'react';

export default ({ arrOfUsersPlaying, showPlayerScores }) =>
  showPlayerScores ? (
    <div className="player-scores-container">
      <h5 className="player-score-header">Current Scores:</h5>
      <ul className="player-scores-list">
        {arrOfUsersPlaying.length > 0
          ? arrOfUsersPlaying.map((user, idx) => (
              <li key={`playerScore${idx}`}>{`${user.name}: ${user.score}`}</li>
            ))
          : 'No scores currently available'}
      </ul>
    </div>
  ) : null;
