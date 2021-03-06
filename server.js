var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');

var db = require('./databases/MongooseAdapter');
db.connect();

var index = require('./routes/index');
var user = require('./routes/user');
var song = require('./routes/song');

var app = express();

//
// MIDDLEWARE
//
app.use(express.static(path.join(__dirname, 'public')));
app.use('/song', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'Love is an open door',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

//
// ROUTES
//
app.use('/', index);
app.use('/user', user);
app.use('/api/song', song);

//
// START SERVER
//
var port = 3000;
app.listen(port, function() {
  console.log('Server started on port ' + port);
});
