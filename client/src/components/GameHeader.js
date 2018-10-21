import React from 'react';
import TimeHeader from './TimeHeader';
import WordDifficultyHeader from './WordDifficultyHeader';
import RoundWinner from './RoundWinner';
import Start from './Start';

export default ({
  preRound,
  gameRound,
  isDrawer,
  seconds,
  showWinner,
  winnerName,
  handleStartGameClick,
  togglePlayerScores
}) => (
  <div className="game-header">
    <button onClick={togglePlayerScores} className="toggle-score">
      Scores
    </button>
    <TimeHeader
      preRound={preRound}
      gameRound={gameRound}
      isDrawer={isDrawer}
      seconds={seconds}
    />
    <Start handleStartGameClick={handleStartGameClick} />
    <RoundWinner showWinner={showWinner} winnerName={winnerName} />
  </div>
);
