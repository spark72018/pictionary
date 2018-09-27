import React from 'react';
import MakeUserName from './MakeUserName';
import makeRoomListItemWithCb from '../utilityFns/makeRoomListItemWithCb';

export default function JoinRoom({
  roomNames,
  askForUserName,
  handleRoomItemClick,
  handleSubmit
}) {
  const makeRoomItem = makeRoomListItemWithCb(handleRoomItemClick);
  return (
    <div className="join-room">
      <ul className="rooms">{roomNames.map(makeRoomItem)}</ul>
      {askForUserName ? <MakeUserName handleSubmit={handleSubmit} /> : null}
    </div>
  );
}
