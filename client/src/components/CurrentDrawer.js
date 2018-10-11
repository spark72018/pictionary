import React from 'react';

export default ({ isDrawer, announceDrawer, currentDrawerName }) =>
  announceDrawer ? (
    <div>
      <h2>{`${
        isDrawer ? 'You are' : currentDrawerName + ' is'
      } the current drawer.`}</h2>
    </div>
  ) : null;
