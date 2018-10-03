import TimeLeft from './TimeLeft';

export default ({ preround, gameRound, isDrawer, seconds }) =>
  preRound ? (
    <div className="time-container">
      {isDrawer ? (
        <h3>Time left to become familiar with card: </h3>
      ) : (
        <h3>Time left for drawer to become familliar with card: </h3>
      )}
      <TimeLeft seconds={seconds} />
    </div>
  ) : gameRound ? (
    <div className="time-container">
      <h3>Time left until round ends: </h3>
      <TimeLeft seconds={seconds} />
    </div>
  ) : null;
