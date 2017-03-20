var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/malappurathDB');

var db = mongoose.connection;
module.exports = db;
