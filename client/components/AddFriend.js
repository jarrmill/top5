import React from 'react';
import { AddMain, AddInput, AddButton } from './style/AddStyles';

const AddFriend = (props) => {
  return (<AddMain>
    <AddInput type="text" value={props.friend.name} onChange={e => props.changeFriend(e, "name")} />
    <div>
      <select value={props.friend.weight} onChange={e => props.changeFriend(e, 'weight')} >
        <option value="1">Core 5</option>
        <option value="1">Family</option>
        <option value="2">Important 50</option>
        <option value="3">Community 100</option>
      </select>
    </div>
    <AddButton onClick={props.submitFriend}>Submit</AddButton>
  </AddMain>);
};

export default AddFriend;
