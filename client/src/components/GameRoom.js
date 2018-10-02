import React from 'react';
import Start from './Start';
import TimeLeft from './TimeLeft';
import PickDifficulty from './PickDifficulty';
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
  handleStartGameClick,
  handleStartRoundClick,
  handlePickDifficultyClick,
  children
}) {
  return (
    <div className="game-room">
      {wordDifficulty ? (
        <div className="word-difficulty">
          <h2>{`Drawer has picked ${
            wordDifficulty === 'easyWords'
              ? 'an easy'
              : wordDifficulty === 'mediumWords'
                ? 'a medium'
                : wordDifficulty === 'hardWords'
                  ? 'a hard'
                  : null
          } word`}</h2>
        </div>
      ) : null}
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
      {preRound ? (
        <div>
          {isDrawer ? (
            <h3>Time left to become familiar with card: </h3>
          ) : (
            <h3>Time left for drawer to become familliar with card: </h3>
          )}
          <TimeLeft seconds={seconds} />
        </div>
      ) : gameRound ? (
        <h3>Time left until round ends: </h3>
      ) : null}
      {children}
    </div>
  );
}
