import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const FriendsEntry = (props) => {
  const { friend } = props;
  const date = formatDistanceToNow(new Date(friend.date));
  return (
    <div>
      <div>{friend.name}</div>
      <div>{date}</div>
      <button onClick={() => props.updateFriend(friend)}>Update</button>
      <button onClick={() => props.deleteFriend(friend)}>Delete</button>
    </div>
  );
};

export default FriendsEntry;