import React from 'react';

export default ({ isDrawer, announceDrawer, currentDrawerName }) =>
  announceDrawer ? (
    <div>
      <h4>{`${
        isDrawer ? 'You are' : currentDrawerName + ' is'
      } the current drawer.`}</h4>
    </div>
  ) : null;
