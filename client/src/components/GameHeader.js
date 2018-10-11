import React from 'react';
import TimeHeader from './TimeHeader';
import CurrentDrawer from './CurrentDrawer';
import WordDifficultyHeader from './WordDifficultyHeader';
import CurrentWordHeader from './CurrentWordHeader';
import RoundWinner from './RoundWinner';
import Start from './Start';

export default ({
  preRound,
  gameRound,
  isDrawer,
  seconds,
  announceDrawer,
  currentWord,
  currentDrawerName,
  pickDifficulty,
  wordDifficulty,
  showWinner,
  winnerName,
  handleStartGameClick,
  handleStartRoundClick,
  togglePlayerScores
}) => (
  <div className="game-header">
    <button onClick={togglePlayerScores} className="toggle-score">
      Scores
    </button>
    <WordDifficultyHeader
      isDrawer={isDrawer}
      pickDifficulty={pickDifficulty}
      wordDifficulty={wordDifficulty}
    />
    <CurrentWordHeader
      preRound={preRound}
      gameRound={gameRound}
      isDrawer={isDrawer}
      currentWord={currentWord}
    />
    <TimeHeader
      preRound={preRound}
      gameRound={gameRound}
      isDrawer={isDrawer}
      seconds={seconds}
    />
    <CurrentDrawer
      isDrawer={isDrawer}
      announceDrawer={announceDrawer}
      currentDrawerName={currentDrawerName}
    />
    <Start
      handleStartGameClick={handleStartGameClick}
      handleStartRoundClick={handleStartRoundClick}
    />
    <RoundWinner showWinner={showWinner} winnerName={winnerName} />
  </div>
);
