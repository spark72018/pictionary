import React from 'react';
import TimeLeft from './TimeLeft';

export default ({ preRound, gameRound, isDrawer, seconds }) =>
  preRound ? (
    <div className="time-container">
      {isDrawer ? (
        <h4>Time left to become familiar with card: </h4>
      ) : (
        <h4>Pre-round ends: </h4>
      )}
      <TimeLeft seconds={seconds} />
    </div>
  ) : gameRound ? (
    <div className="time-container">
      <h4>Round ends: </h4>
      <TimeLeft seconds={seconds} />
    </div>
  ) : null;
  // preRound ? (
  //   <div className="time-container">
  //     {isDrawer ? (
  //       <h4>Time left to become familiar with card: </h4>
  //     ) : (
  //       <h4>Pre-round ends: </h4>
  //     )}
  //     <TimeLeft seconds={seconds} />
  //   </div>
  // ) : gameRound ? (
  //   <div className="time-container">
  //     <h4>Round ends: </h4>
  //     <TimeLeft seconds={seconds} />
  //   </div>
  // ) : null;
