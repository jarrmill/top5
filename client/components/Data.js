import React from 'react';

const Data = (props) => {
  const { friends } = props;
  return (
    <div>
      <p>You have:</p>
      <p>{countFriends("1", friends)} Core Friends</p>
      <p>{countFriends("2", friends)} Close Network Friends</p>
      <p>{countFriends("3", friends)} Grand Network Friends</p>
    </div>
  );
};

const countFriends = (weight, friends) => {
  let count = 0;
  Object.values(friends).forEach((friend) => {
    console.log(typeof (friend.weight), typeof (weight));
    if (friend.weight === weight) count += 1;
  });
  return count;
}

export default Data;
