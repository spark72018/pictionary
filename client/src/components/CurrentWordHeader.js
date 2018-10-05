import React from 'react';

export default ({ preRound, gameRound, isDrawer, currentWord }) =>
  !preRound && !gameRound ? (
    <h2>Game hasnt started yet</h2>
  ) : isDrawer ? (
    <h2 className="current-word">{`Current Word: ${currentWord}`}</h2>
  ) : (
    <h2 className="status">You are a guesser</h2>
  );
