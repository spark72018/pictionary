import React from 'react';

export default function GameRoom({ children }) {
  console.log('GameRoom children', children);
  return <div className="game-room">{children}</div>;
}
