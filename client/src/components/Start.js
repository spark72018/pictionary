import React from 'react';

export default function Start({ drawer, handleStartGameClick }) {
  return (
    <div className="start-buttons-container">
      <button onClick={handleStartGameClick} className="start-button">
        Start Game
      </button>
    </div>
  );
}
