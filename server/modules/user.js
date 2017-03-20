
var registerUser = require('./register.js');
var authenticateUser = require('./authenticate.js');
var addAccount = require('./addAccounts.js');
var myAccounts = require('./accounts.js');
var removeAccount= require('./removeAccounts.js')

exports.authenticate = authenticateUser;
exports.register = registerUser;
exports.accounts = myAccounts;
exports.addAccounts = addAccount;
exports.removeAccounts = removeAccount;
