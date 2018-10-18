import React from 'react';
import Start from './Start';
import GameHeader from './GameHeader';
import CurrentWordHeader from './CurrentWordHeader';
import CurrentDrawer from './CurrentDrawer';
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

  console.log('GameRoom showAlert', showAlert);
  console.log('GameRoom alertInfo', alertInfo);
  // TODO: SWEETALERT ISN'T SHOWING UP
  return (
    <div className="game-room">
      <GameHeader
        preRound={preRound}
        gameRound={gameRound}
        isDrawer={isDrawer}
        seconds={seconds}
        pickDifficulty={pickDifficulty}
        wordDifficulty={wordDifficulty}
        showWinner={showWinner}
        winnerName={winnerName}
        handleStartGameClick={handleStartGameClick}
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
      <CurrentWordHeader
        preRound={preRound}
        gameRound={gameRound}
        isDrawer={isDrawer}
        currentWord={currentWord}
      />
      <CurrentDrawer
        isDrawer={isDrawer}
        announceDrawer={announceDrawer}
        currentDrawerName={currentDrawerName}
      />
      <PlayerScores
        showPlayerScores={showPlayerScores}
        arrOfUsersPlaying={roomInfo.usersPlaying}
      />
      <SweetAlert
        {...alertInfo}
        show={showAlert}
        onConfirm={() => setShowAlert(false)}
      />
      {children}
    </div>
  );
}
