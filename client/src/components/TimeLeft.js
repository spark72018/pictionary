import React, { Component } from 'react';

export default class Timer extends Component {
  convertToTimerStr = seconds => {
    const minutes = Math.floor(seconds / 60);

    seconds -= minutes * 60;

    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return minutesStr + ':' + secondsStr;
  };

  render() {
    const { seconds, handleStartRound } = this.props;
    return (
      <div className="timer-container">
        <span className="time-text">{this.convertToTimerStr(seconds)}</span>
      </div>
    );
  }
}
