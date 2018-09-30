import React from 'react';

export default function Start({
  drawer,
  handleStartGameClick,
  handleStartRoundClick
}) {
  return (
    <div className="start-buttons-container">
      <button onClick={handleStartGameClick} className="start-button">
        Start Game
      </button>
      <button
        onClick={handleStartRoundClick}
        className={drawer ? 'start-button' : 'start-button disable'}
      >
        Start Round
      </button>
    </div>
  );
}
