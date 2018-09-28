import React from 'react';

export default function GameRoom({ chatRoom, drawingBoard }) {
  return (
    <div className="game-room">
      {drawingBoard}
      {chatRoom}
    </div>
  );
}
