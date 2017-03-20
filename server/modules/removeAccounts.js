var mongoose = require('mongoose');
var accountmodel = require('../db/schema/accountSchema');

function removeAccounts(req, res) {
  var myAccount = req.body;
  console.log('oye2' + myAccount)
  removeAccount(myAccount, function(err, newAccount) {
    if (err) {
      console.log('oye3' + err)
      res.status(402).send(err);
      //res.send(err)
    } else {
      console.log('oye4' + newAccount)
      res.json(req.body)
    }

  });
}

function removeAccount(myAccount, removeAccountCB) {
  console.log(myAccount.accountNumber);
  var query = accountmodel.where({
    accountNumber: myAccount.accountNumber,
    userName: myAccount.userName,
    //,passWord: password
  });
  query.findOneAndRemove(function(err, newUser) {
      console.log('new ' + newUser);
      var removeStatus = "failed";
      if (err) {
        console.log('status '+removeStatus);
        return removeAccountCB(err);

      } else if (newUser) {
        removeStatus = 'success'
        console.log('status '+removeStatus);
        return removeAccountCB(null, removeStatus)
      }
     else {
      removeStatus = 'no account found'
      console.log('status '+removeStatus);
      return removeAccountCB(null, removeStatus)
    }
  });

}

module.exports = removeAccounts;
