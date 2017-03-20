var express = require('express');
var fs = require('fs');
var user = require('./server/modules/user');
//var login = require('./server/router/login');
//var register = require('./server/router/register');
//var accounts = require('./server/router/accounts');
//var addAccounts = require('./server/router/addAccounts');
var db = require('./server/db')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
  var app = express();
  app.listen(5050, function() {
    console.log("my node server localhost:5050 started successfully")
  })

  app.use(express.static(__dirname + '/webportal'));
  app.use(jsonParser)
  app.post('/user/login',user.authenticate);
  app.post('/user/register', user.register);
  app.post('/user/accounts', user.accounts);
  app.post('/admin/addAccounts', user.addAccounts);
  app.post('/admin/removeAccounts', user.removeAccounts);


});
