import React from 'react';

export default ({ announceDrawer, currentDrawerName }) =>
  announceDrawer ? (
    <div>
      <h2>{`${currentDrawerName} is the current drawer.`}</h2>
    </div>
  ) : null;
