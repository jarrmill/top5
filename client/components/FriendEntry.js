import React from 'react';
import { formatDistanceToNow, getTime } from 'date-fns';
import { Entry, Name, Time, EntryButton } from './style/EntryStyle';

const formatDate = (date) => {
  const now = Date.now();
  const friendDate = new Date(date);

  if (getTime(now) > getTime(friendDate)) {
    return 'Overdue';
  }
  return formatDistanceToNow(friendDate);
};

const FriendsEntry = (props) => {
  const { friend } = props;

  return (friend) ? (
    <Entry>
      <Name className="title">{friend.name}</Name>
      <Time>{formatDate(friend.date)}</Time>
      <EntryButton
        onClick={() => props.updateFriend(friend)}>
        Update
        </EntryButton>
      <EntryButton onClick={() => props.deleteFriend(friend)}>Delete</EntryButton>
    </Entry>
  ) : (
      <Entry>
        <Name></Name>
        <Time></Time>
        <EntryButton disabled></EntryButton>
        <EntryButton disabled></EntryButton>
      </Entry>
    );
};

export default FriendsEntry;
