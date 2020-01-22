import React from 'react';

const AddFriend = (props) => {
  return (<div>
    <input type="text" value={props.friend.name} onChange={e => props.changeFriend(e, "name")} />
    <select value={props.friend.weight} onChange={e => props.changeFriend(e, 'weight')} >
      <option value="1">Core 5</option>
      <option value="1">Family</option>
      <option value="2">Important 50</option>
      <option value="3">Community 100</option>
    </select>
    <button onClick={props.submitFriend} >Submit</button>
  </div>);
};

export default AddFriend;
