import React from 'react';
import Start from './Start';
import TimeHeader from './TimeHeader';
import PickDifficulty from './PickDifficulty';
import PickWinner from './PickWinner';
import WordDifficultyHeader from './WordDifficultyHeader';
import CurrentWordHeader from './CurrentWordHeader';
import SweetAlert from 'sweetalert2-react';

export default function GameRoom({
  askForWinner,
  showAlert,
  alertInfo,
  pickDifficulty,
  wordDifficulty,
  currentWord,
  isDrawer,
  preRound,
  gameRound,
  roomInfo,
  handleStartGameClick,
  handleStartRoundClick,
  handlePickDifficultyClick,
  handlePickWinnerClick,
  setShowAlert,
  children
}) {
  const seconds = preRound
    ? roomInfo.preRoundSeconds
    : gameRound
      ? roomInfo.roundSeconds
      : 0;
  const { usersPlaying } = roomInfo;
  return (
    <div className="game-room">
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
      <PickWinner
        askForWinner={askForWinner}
        isDrawer={isDrawer}
        usersPlaying={usersPlaying}
        handlePickWinnerClick={handlePickWinnerClick}
      />
      <SweetAlert
        showAlert={showAlert}
        title={alertInfo.title}
        text={alertInfo.text}
        onConfirm={() => setShowAlert(false)}
      />
      <PickDifficulty
        isDrawer={isDrawer}
        pickDifficulty={pickDifficulty}
        handlePickDifficultyClick={handlePickDifficultyClick}
      />
      <Start
        handleStartGameClick={handleStartGameClick}
        handleStartRoundClick={handleStartRoundClick}
      />
      <TimeHeader
        preRound={preRound}
        gameRound={gameRound}
        isDrawer={isDrawer}
        seconds={seconds}
      />
      {children}
    </div>
  );
}
