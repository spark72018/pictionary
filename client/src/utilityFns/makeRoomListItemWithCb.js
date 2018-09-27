import React from 'react';

export default function withCallBack(cb) {
  return function(name, idx) {
    return (
      <li onClick={cb} key={`room${idx}`}>
        <a>{name}</a>
      </li>
    );
  };
}
