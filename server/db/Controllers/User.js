const User = require('../Models/User');

const createUser = (email, friends = {}) => (
  new Promise((resolve, reject) => {
    const user = new User({
      email,
      friends,
    });

    user.save((err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  })
);

const getUserByEmail = email => (
  new Promise((resolve, reject) => {
    User.find({ email }, (err, docs) => {
      if (err) {
        reject(err);
      }
      resolve(docs);
    });
  })
);

const updateUserFriends = (email, friends) => (
  new Promise((resolve, reject) => {
    // console.log('Updating: ', email, friends);
    User.findOneAndUpdate({ email }, { friends }, (err, docs) => {
      if (err) {
        reject(err);
      }

      resolve(docs);
    });
  })
);

const findOrCreateUser = email => (
  new Promise((resolve, reject) => {
    getUserByEmail(email)
      .then((results) => {
        if (results.length) resolve(results[0]);

        return createUser(email);
      })
      .then(() => getUserByEmail(email))
      .then(getUserResults => resolve(getUserResults))
      .catch(err => reject(err));
  })
);

const deleteUser = email => (
  new Promise((resolve, reject) => {
    User.deleteMany({ email }, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        console.log('Deleted?');
        getUserByEmail(email).then(results => console.log(results));
        resolve(docs);
      }
    });
  })
);

module.exports = {
  createUser,
  getUserByEmail,
  updateUserFriends,
  findOrCreateUser,
  deleteUser,
};
