import React from 'react';

export default function Message({ data, idx }) {
  const { username, time, msg } = data;
  return (
    <li key={`msg${idx}`}>
      {username ? (
        <p className="message">
          <span className="msg-time">({time})</span> {username}
          &#58; {msg}
        </p>
      ) : (
        <p className="message">
          <span className="msg-time">{time}</span>
          &#58; {msg}
        </p>
      )}
    </li>
  );
}
