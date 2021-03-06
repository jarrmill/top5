const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  friends: Object,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
