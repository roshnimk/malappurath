var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
    unique: true
  },
  accountType: String,
  branch: String,
  accountBalance: {
    type: Number,
    required: true

  }
});

var accountmodel = mongoose.model('accountmodel', accountSchema);
module.exports = accountmodel ;
