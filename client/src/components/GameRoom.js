import React from 'react';
import Start from './Start';
import GameHeader from './GameHeader';
import PickDifficulty from './PickDifficulty';
import PickWinner from './PickWinner';
import PlayerScores from './PlayerScores';
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
  showPlayerScores,
  winnerId,
  handleStartGameClick,
  handleStartRoundClick,
  handlePickDifficultyClick,
  handlePickWinnerClick,
  setShowAlert,
  togglePlayerScores,
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
      <GameHeader
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
        handleStartGameClick={handleStartGameClick}
        handleStartRoundClick={handleStartRoundClick}
        togglePlayerScores={togglePlayerScores}
      />
      <PickDifficulty
        isDrawer={isDrawer}
        pickDifficulty={pickDifficulty}
        handlePickDifficultyClick={handlePickDifficultyClick}
      />
      <PickWinner
        askForWinner={askForWinner}
        isDrawer={isDrawer}
        usersPlaying={usersPlaying}
        handlePickWinnerClick={handlePickWinnerClick}
      />
      <PlayerScores
        showPlayerScores={showPlayerScores}
        arrOfUsersPlaying={roomInfo.usersPlaying}
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
