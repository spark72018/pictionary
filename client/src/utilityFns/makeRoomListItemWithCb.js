import React from 'react';

export default function withCallBack(cb) {
  return function({ name, image }, idx) {
    const style = { backgroundImage: `url(${image})` };
    return (
      <li style={style} onClick={cb} key={`room${idx}`}>
        <a>{name}</a>
      </li>
    );
  };
}
