/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import axios from 'axios';
import { addDays } from 'date-fns';
import AddFriend from './AddFriend';
import FriendsList from './FriendsList';
import Header from './Header';
import Data from './Data';

import { Main } from './style/AppStyles';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userEmail: '',
      friend: {
        name: '',
        weight: 1,
      },
      friends: {},
    };

    this.scales = {
      1: 2,
      2: 7,
      3: 30,
    };
    this.changeFriend = this.changeFriend.bind(this);
    this.submitFriend = this.submitFriend.bind(this);
    this.updateFriend = this.updateFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  componentDidMount() {
    axios.get('/auth/user')
      .then((res) => {
        const user = res.data;
        if (user.isLoggedIn && user.email) {
          this.setState({ userEmail: user.email }, () => this.fetchFriends(user));
        }
      })
  }

  fetchFriends() {
    const email = this.state.userEmail;
    axios.get('/api/friends', { headers: { email } })
      .then((results) => {
        const { friends } = results.data;
        this.setState({ friends, isLoading: false }, () => console.log(this.state));
      })
      .catch(error => console.log('Error in fetchFriends', error));
  }

  changeFriend(e, target) {
    const { friend } = this.state;
    const val = (target === 'name') ? e.target.value : parseInt(e.target.value, 10);

    friend[target] = val;
    this.setState({ friend }, () => console.log(this.state));
  }

  deleteUser() {
    axios.delete('/api/user');
  }

  deleteFriend(friend) {
    axios.delete('/api/friends', { headers: { friend: JSON.stringify(friend) } })
      .then(() => this.fetchFriends())
      .catch(err => console.log('Error in delete friend', err));
  }

  submitFriend() {
    const { name, weight } = this.state.friend;
    const newFriend = {
      name,
      weight,
      date: addDays(Date.now(), this.scales[weight])
    }

    axios.post('/api/friends', newFriend)
      .then(() => this.fetchFriends())
      .catch(err => console.log('Error in post friend', err));

    this.setState({ friend: { name: '', weight: 1 } });
  }

  updateFriend(friend) {
    // this function should calculate a new date and post it to the server
    const { friends } = this.state;
    const next_date = this.scales[friend.weight];
    friends[friend.name].date = addDays(Date.now(), next_date).toISOString();

    axios.post('/api/friends', friends[friend.name])
      .then(() => {
        this.setState({ friends }, () => console.log('State updated: ', this.state.friends));
      })
      .catch((error) => console.log('Error in updateFriend: ', error));
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Router>
        <Header />
        <Route path="/home">
          <Main>
            {/* <button onClick={this.deleteUser}>DeleteUser</button> */}
            <AddFriend
              friend={this.state.friend}
              changeFriend={this.changeFriend}
              submitFriend={this.submitFriend}
            />
            <FriendsList
              friends={this.state.friends}
              updateFriend={this.updateFriend}
              deleteFriend={this.deleteFriend}
              isLoading={this.state.isLoading}
            />
          </Main>
        </Route>
        <Route path="/data">
          <Data friends={this.state.friends} />
        </Route>
      </Router>

    );
  }
}

export default App;
