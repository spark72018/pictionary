import React from 'react';
import Start from './Start';
import TimeHeader from './TimeHeader';
import PickDifficulty from './PickDifficulty';
import WordDifficultyHeader from './WordDifficultyHeader';
import CurrentWordHeader from './CurrentWordHeader';
import SweetAlert from 'sweetalert2-react';

export default function GameRoom({
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
  setShowAlert,
  children
}) {
  const seconds = preRound
    ? roomInfo.preRoundSeconds
    : gameRound
      ? roomInfo.roundSeconds
      : 0;

  return (
    <div className="game-room">
      <WordDifficultyHeader wordDifficulty={wordDifficulty} />
      <CurrentWordHeader isDrawer={isDrawer} currentWord={currentWord} />
      <SweetAlert
        showAlert={showAlert}
        title={alertInfo.title}
        text={alertInfo.text}
        onConfirm={() => setShowAlert(false)}
      />
      <PickDifficulty
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
