import React from 'react';

export default ({isDrawer, pickDifficulty, wordDifficulty }) =>
  wordDifficulty ? (
    <div className="word-difficulty">
      <h2>{`Drawer has picked ${
        wordDifficulty === 'easyWords'
          ? 'an easy'
          : wordDifficulty === 'mediumWords'
            ? 'a medium'
            : wordDifficulty === 'hardWords'
              ? 'a hard'
              : null
      } word`}</h2>
    </div>
  ) : null;
