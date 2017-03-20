var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  userName: {
    type: String,
    required: true,
    unique: true
  },
  emailId: String,
  passWord: {
    type: String,
    required: true
  },
  accounts: Array
});

var users = mongoose.model('users', userSchema);
module.exports = users ;
