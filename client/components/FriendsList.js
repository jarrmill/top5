import React from 'react';
import { getTime } from 'date-fns';
import FriendsEntry from './FriendEntry';

const FriendsList = (props) => {
  const friends = sortFriends(props.friends);
  console.log('Sorted: ', friends);
  const friends_list = friends.map((friend) => {
    return (
      <FriendsEntry friend={friend} updateFriend={props.updateFriend} deleteFriend={props.deleteFriend} />
    )
  })

  return (<div>
    {friends_list}
  </div>);
};

const sortFriends = (friends) => {
  const friends_arr = [];
  for (var key in friends) {
    friends_arr.push(friends[key]);
  }

  try {
    const sorted = friends_arr.sort((a, b) => {
      const a_date = new Date(a.date);
      const b_date = new Date(b.date);
      return getTime(b_date) - getTime(a_date);
    });
    return sorted;
  }
  catch (err) {
    console.log('Error in sortFriends', err);
    return [];
  }
};

export default FriendsList;