import React from 'react';

export default function Message({ data, idx, handleChatMessageClick }) {
  const { username, time, msg, timeId, warm } = data;
  return (
    <li onClick={handleChatMessageClick} key={`msg${idx}`}>
      {username ? (
        <p data-timeid={timeId} className={!warm ? 'message' : 'message warm'}>
          <span className="msg-time">({time})</span> {username}
          &#58; {msg}
        </p>
      ) : (
        <p data-timeid={timeId} className="message">
          <span className="msg-time">{time}</span>
          &#58; {msg}
        </p>
      )}
    </li>
  );
}
