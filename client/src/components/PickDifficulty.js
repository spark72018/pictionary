import React from 'react';

export default function PickDifficulty({
  pickDifficulty,
  handlePickDifficultyClick
}) {
  return pickDifficulty ? (
    <ul className="pick-difficulty">
      <li onClick={handlePickDifficultyClick} data-difficulty={'easyWords'}>
        Easy Word
      </li>
      <li onClick={handlePickDifficultyClick} data-difficulty={'mediumWords'}>
        Medium Word
      </li>
      <li onClick={handlePickDifficultyClick} data-difficulty={'hardWords'}>
        Hard Word
      </li>
    </ul>
  ) : null;
}
