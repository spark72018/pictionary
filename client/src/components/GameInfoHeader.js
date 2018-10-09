import React from 'react';
import TimeHeader from './TimeHeader';
import CurrentDrawer from './CurrentDrawer';
import WordDifficultyHeader from './WordDifficultyHeader';
import CurrentWordHeader from './CurrentWordHeader';
import RoundWinner from './RoundWinner';

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
  winnerName
}) => (
  <React.Fragment>
    <TimeHeader
      preRound={preRound}
      gameRound={gameRound}
      isDrawer={isDrawer}
      seconds={seconds}
    />
    <CurrentDrawer
      announceDrawer={announceDrawer}
      currentDrawerName={currentDrawerName}
    />
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
    <RoundWinner showWinner={showWinner} winnerName={winnerName} />
  </React.Fragment>
);
