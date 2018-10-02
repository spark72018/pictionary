import React from 'react';
import Start from './Start';
import TimeLeft from './TimeLeft';
import PickDifficulty from './PickDifficulty';
import SweetAlert from 'sweetalert2-react';

export default function GameRoom({
  showAlert,
  alertInfo,
  seconds,
  pickDifficulty,
  currentWord,
  isDrawer,
  handleStartGameClick,
  handleStartRoundClick,
  handlePickDifficultyClick,
  children
}) {
  return (
    <div className="game-room">
      {isDrawer ? (
        <h2 className="current-word">{`Current Word: ${currentWord}`}</h2>
      ) : (
        <h2 className="status">You are a guesser</h2>
      )}
      <SweetAlert
        showAlert={showAlert}
        title={alertInfo.title}
        text={alertInfo.text}
        onConfirm={() => this.setState({ showAlert: false })}
      />
      {pickDifficulty ? (
        <PickDifficulty handlePickDifficultyClick={handlePickDifficultyClick} />
      ) : null}
      <Start
        handleStartGameClick={handleStartGameClick}
        handleStartRoundClick={handleStartRoundClick}
      />
      <TimeLeft seconds={seconds} />
      {children}
    </div>
  );
}
