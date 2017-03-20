var mongoose = require('mongoose');
var accountmodel = require('../db/schema/accountSchema');

function accounts(req, res) {
  var myUser = req.body;
  myAccounts(myUser, function(err, myAccounts) {
    if (err) {
      res.send(err)
    } else {
      res.json(myAccounts)
    }
  });
}

function myAccounts(myUser, accountsCB) {
  var query = accountmodel.where({
    userName: myUser.username
  });
  query.find(function(err, accounts) {
    var accountStatus = "failed";
    if (err) {
      return accountsCB(err)
    } else if (accounts) {
      accountStatus = 'success'
      return accountsCB(null, accounts)
    } else {
      accountStatus = 'no accounts found'
      return accountsCB(null, accountStatus)
    }
  });

}

module.exports = accounts ;
