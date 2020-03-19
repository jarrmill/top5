import React from 'react';

const Data = (props) => {
  const { friends } = props;
  return (
    <div>
      <div className="nes-container with-title">
        <p className="title">Core Friends</p>
        <ul className="nest-list is-circle">
          {renderFriendGroup("1", friends)}
        </ul>
      </div>
      <br></br>
      <div className="nes-container with-title">
        <p className="title">50 Network</p>
        <ul className="nest-list is-circle">
          {renderFriendGroup("2", friends)}
        </ul>
      </div>
      <br></br>
      <div className="nes-container with-title">
        <p className="title">Big Network Friends</p>
        <ul className="nest-list is-circle">
          {renderFriendGroup("3", friends)}
        </ul>
      </div>
      <p>You have:</p>
      <p>{countFriends("1", friends)} Core Friends</p>
      <p>{countFriends("2", friends)} Close Network Friends</p>
      <p>{countFriends("3", friends)} Grand Network Friends</p>
    </div>
  );
};

const renderFriendGroup = (weight, friends) => {
  let group = [];
  Object.values(friends).forEach((friend) => {
    const fWeight = (typeof friend.weight === 'number') ? friend.weight.toString() : friend.weight;
    if (fWeight === weight) {
      group.push(<li>
        {friend.name}
      </li>);
    }
  });
  return group;
}

const countFriends = (weight, friends) => {
  let count = 0;
  Object.values(friends).forEach((friend) => {
    const fWeight = (typeof friend.weight === 'number') ? friend.weight.toString() : friend.weight;
    if (fWeight === weight) count += 1;
  });
  return count;
}

export default Data;
