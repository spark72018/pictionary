import React from 'react';
import Start from './Start';
import GameInfoHeader from './GameInfoHeader';
import PickDifficulty from './PickDifficulty';
import PickWinner from './PickWinner';
import SweetAlert from 'sweetalert2-react';

export default function GameRoom({
  askForWinner,
  announceDrawer,
  currentDrawerName,
  showAlert,
  alertInfo,
  pickDifficulty,
  wordDifficulty,
  currentWord,
  isDrawer,
  preRound,
  gameRound,
  roomInfo,
  showWinner,
  winnerId,
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
  const winnerName = winnerId
    ? usersPlaying.find(user => user.id === winnerId).name
    : '';

  return (
    <div className="game-room">
      <GameInfoHeader
        preRound={preRound}
        gameRound={gameRound}
        isDrawer={isDrawer}
        seconds={seconds}
        announceDrawer={announceDrawer}
        currentWord={currentWord}
        currentDrawerName={currentDrawerName}
        pickDifficulty={pickDifficulty}
        wordDifficulty={wordDifficulty}
        showWinner={showWinner}
        winnerName={winnerName}
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
      {children}
    </div>
  );
}
