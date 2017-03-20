var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var accountmodel = require('../db/schema/accountSchema');

function addAccounts(req, res) {
  var myAccount = req.body;
  addAccount(myAccount, function(err, newAccount) {
    if (err) {
      res.send(err)
    } else {
      res.json(req.body)
    }
  });
}

function addAccount(myAccount, addAccountCB) {
  var newAccount = new accountmodel({
    userName: myAccount.userName,
    accountNumber: myAccount.accountNumber,
    accountType: myAccount.accountType,
    branch: myAccount.branch,
    accountBalance: myAccount.accountBalance
  })
  newAccount.save(function(err, newAccount) {
    if (err) {
      return addAccountCB(err)
    } else {
      return addAccountCB(null, newAccount);
    }
  })
}

module.exports = addAccounts;
