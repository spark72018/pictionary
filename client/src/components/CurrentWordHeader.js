import React from 'react';

export default ({ preRound, gameRound, isDrawer, currentWord }) =>
  !preRound && !gameRound ? (
    <h4>Game hasnt started yet</h4>
  ) : isDrawer ? (
    <h4 className="current-word">{`Current Word: ${currentWord}`}</h4>
  ) : (
    <h4 className="status">You are a guesser</h4>
  );
