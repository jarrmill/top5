const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');

const verifyUser = require('./middleware/verifyUser');
const db = require('./db/Controllers');

require('dotenv').config();
require('./db/config');

const app = express();
app.use(morgan('dev')); // Logs all inbound requests to console
app.use(express.json());
app.use(express.static('dist'));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SESSION],
}));

// this require must be before passport initializes and after the cooke session middleware
require('./auth');

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/friends', verifyUser, (req, res) => {
  db.User.findOrCreateUser(req.headers.email)
    .then((results) => {
      console.log('Found: ', results);
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send({ error: 'db error' });
    })
});

app.post('/api/friends', verifyUser, (req, res) => {
  const friend = req.body;
  db.User.getUserByEmail(req.user.email)
    .then((results) => {
      console.log('RESULTS, ', results);
      let friends;
      if (results.length && results[0].friends) {
        friends = results[0].friends;
        friends[friend.name] = {
          name: friend.name,
          weight: friend.weight,
          date: friend.date,
        };
      } else {
        friends = {
          [friend.name]:
          {
            name: friend.name,
            weight: friend.weight,
            date: friend.date,
          }
        };
      }
      console.log('FRIENDS: ', req.user.email, friends);
      db.User.updateUserFriends(req.user.email, friends)
        .then(result => res.status(201).send(result))
        .catch(error => res.status(500).send(error));
    })
    .catch((error) => {
      console.log('Error in getUserByEmail', error);
      res.status(500).send(error);
    });
});

app.delete('/api/user', verifyUser, (req, res) => {
  db.User.deleteUser(req.user.email)
    .then(() => res.status(201).send('It is done'))
    .catch(() => res.status(500).send('Error'));
})

app.delete('/api/friends', verifyUser, (req, res) => {
  console.log('Deleting friends!', req.headers.friend);
  const friend = JSON.parse(req.headers.friend);
  db.User.getUserByEmail(req.user.email)
    .then((results) => {
      if (results.length && results[0].friends) {
        let friends = results[0].friends;
        if (friends[friend.name]) {
          delete friends[friend.name];
        }

        db.User.updateUserFriends(req.user.email, friends)
          .then(result => res.status(201).send(result))
          .catch(error => res.status(500).send(error));
      }
      else {
        res.status(400).send();
      }
    })
    .catch((error) => {
      console.log('Error in getUserByEmail', error);
      res.status(500).send(error);
    });
});

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: true }),
  (req, res) => {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/test', verifyUser, (req, res) => {
  res.send(`User authenitcated. Welcome back ${req.user.email}`);
});

app.get('/auth/user', (req, res) => {
  if (req.user) {
    res.send({
      isLoggedIn: true,
      email: req.user.email,
    });
  } else {
    res.send({
      isLoggedIn: false,
    });
  }
});

app.get('*', (req, res) => res.sendFile(path.resolve('dist', 'index.html')));
module.exports = app;
