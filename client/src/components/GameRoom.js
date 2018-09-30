import React from 'react';
import Start from './Start';
import TimeLeft from './TimeLeft';
import SweetAlert from 'sweetalert2-react';

export default function GameRoom({
  showAlert,
  alertInfo,
  seconds,
  handleStartGameClick,
  handleStartRoundClick,
  children
}) {
  return (
    <div className="game-room">
      <SweetAlert
        showAlert={showAlert}
        title={alertInfo.title}
        text={alertInfo.text}
        onConfirm={() => this.setState({ showAlert: false })}
      />
      <Start
        handleStartGameClick={handleStartGameClick}
        handleStartRoundClick={handleStartRoundClick}
      />
      <TimeLeft seconds={seconds} />
      {children}
    </div>
  );
}
