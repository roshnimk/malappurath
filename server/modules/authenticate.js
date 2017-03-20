var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var users = require('../db/schema/userSchema');


function login(req, res) {
  authenticateUser(req.body.username, req.body.password, function(err, loginStatus) {
    if (err) {
      res.json({
        error: err,
        status: 'DB error'
      });
    } else {
      res.json({
        user: req.body.username,
        status: loginStatus
      });
    }
  })
}



function authenticateUser(username, password, callback) {

  console.log("my details" + username + password);
  var query = users.where({
    userName: username
    //,passWord: password
  });
  query.findOne(function(err, newUser) {
    console.log('new '+newUser);
    var loginStatus = "failed";
    var loginUser = '';
    if (err) {
      return callback(err)
    } else if (newUser) {
      bcrypt.compare(password, newUser.passWord, function(err, res) {
        console.log("my resp" + res);
        if (res) {
          loginStatus = 'success'
          loginUser = newUser.firstName;

        } else loginStatus = 'password incorrect';
        return callback(null, loginStatus)
      })
    } else {
      loginStatus = 'no user found'
      return callback(null, loginStatus)
    }
  });



  // var filteredObj = userDetails.find(function(item, i) {
  //   if (item.username === username && item.password === password) {
  //     loginStatus = 'success';
  //     loginUser = username;
  //   }
  // });


}
module.exports = login;
