import React from 'react';

export default function PickDifficulty({
  isDrawer,
  pickDifficulty,
  handlePickDifficultyClick
}) {
  return pickDifficulty && isDrawer ? (
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
  ) : pickDifficulty ? (
    <h2>Drawer is picking a card...</h2>
  ) : null;
}
