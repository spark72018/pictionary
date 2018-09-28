import React from 'react';
import DrawingBoard from './DrawingBoard';

export default function GameRoom({ chatRoom }) {
  return (
    <div className="game-room">
      <DrawingBoard />
      {chatRoom}
    </div>
  );
}
