import React from 'react';
import { getTime } from 'date-fns';
import { Trail, Transition, animated } from 'react-spring/renderprops';
import FriendsEntry from './FriendEntry';

import { Main } from './style/ListStyles';


const FriendsList = (props) => {
  const items = sortFriends(props.friends);
  console.log(items);
  const friendsLength = Object.keys(props.friends).length;
  const skeletons = renderSkeletonFriends();
  const friends_list = items.map((friend) => {
    return (
      <FriendsEntry friend={friend} updateFriend={props.updateFriend} deleteFriend={props.deleteFriend} />
    )
  })

  return (friendsLength) ? (
    <Main>
      {/* <Trail
        items={items}
        keys={item => item.name}
        from={{ marginLeft: 0, opacity: 0 }}
        to={{ marginLeft: 0, opacity: 1 }}
      >
        {item => springProps => (
          <animated.div className="box" style={springProps} >
            <FriendsEntry friend={item} updateFriend={props.updateFriend} deleteFriend={props.deleteFriend} />
          </animated.div>
        )}
      </Trail> */}
      <Transition
        items={items}
        keys={item => item.name}
        from={{ opacity: 0, backgroundColor: 'red' }}
        enter={{ opacity: 1, backgroundColor: 'blue' }}
        leave={{ opacity: 0, backgroundColor: 'red' }}>
        {item => springProps => (
          <animated.div style={springProps} >
            <FriendsEntry friend={item} updateFriend={props.updateFriend} deleteFriend={props.deleteFriend} />
          </animated.div>
        )}
      </Transition>
    </Main>
  ) : (
      <Main>
        {/* <Trail
          items={skeletons}
          keys={skeleton => skeleton.key}
          from={{ marginLeft: -20, opacity: 0, transform: 'translate3d(0,-40px,0)' }}
          to={{ marginLeft: 20, opacity: 1, transform: 'translate3d(0,0px,0)' }}
        >
          {skeleton => springProps => (
            <FriendsEntry style={springProps} />
          )}
        </Trail> */}
        {renderSkeletonFriends()}
      </Main>
    )
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
    return [];
  }
};

const renderSkeletonFriends = () => {
  //    .-.
  //   (o.o)
  //    |=|
  //   __|__
  // //.=|=.\\
  // // .=|=. \\
  // \\ .=|=. //      LET'S GET SPOOKY
  // \\(_=_)//
  //  (:| |:)
  //   || ||
  //   () ()
  //   || ||
  //   || ||
  //  ==' '==
  console.log('Boo! Rendering skeleton friends. They are pretty cool, so be nice to them.');
  // const poop = [];
  // for (let i = 0; i < 6; i += 1) {
  //   poop.push({ key: i });
  // }
  // return poop;
  return ([
    <FriendsEntry key={1} />,
    <FriendsEntry key={2} />,
    <FriendsEntry key={3} />,
    <FriendsEntry key={4} />,
    <FriendsEntry key={5} />,
    <FriendsEntry key={6} />,
  ]);
};

export default FriendsList;
