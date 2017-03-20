var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var users = require('../db/schema/userSchema');

function register(req, res) {
  var myUser = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    userName: req.body.username,
    emailId: req.body.email,
    password: req.body.password
  }

  registerUser(myUser, function(err, registeredUser) {
    if (err) {

      res.json(err)
    } else {
      res.json(registeredUser)
    }

  })
}

function registerUser(user, cb) {
  bcrypt.hash(user.password, null, null, function(err, hash) {
    var newUser = new users({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      emailId: user.emailId,
      passWord: hash, //user.password, //hash,
      accounts: []
    });

    newUser.save(function(err, newUser) {
      if (err) {
        errorMessage = {
          status: false,
          statusCode: '',
          statusMessage: ''
        }
        if (err.code) {
          errorMessage.statusCode = '01';
          switch (err.code) {
            case 11000:
              errorMessage.statusMessage = "Duplicate";
              break;

            default:
              errorMessage.statusMessage = "System Error";
          }
          return cb(errorMessage);
        } else if (err.name == "ValidationError") {
          errorMessage.statusCode = '02';
          errorMessage.statusMessage = "ValidationError"
          return cb(errorMessage)
        } else {
          return cb(err)
        }
      } else {

        delete newUser.__proto__.passWord ;

        return cb(null, newUser);
      }
    });
  });

}

module.exports = register;
