var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');

// TODO: use passport instead of these
var cookieParser = require('cookie-parser');
var session = require('express-session');

// connect with mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database25');
//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mymongodb');
//mongoose.connect('mongodb://kjmoore:password@ds063946.mlab.com:63946/heroku_vqt01pgt');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected");
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); //TODO what does this do?

// TODO: use passport instead of cookieParser
app.use(cookieParser());
app.use(session({
  secret: 'supersecret',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false},
}));

//app.use(express.session({ secret: 'keyboard cat' })); //TODO replace above line with this?
app.use(passport.initialize());
app.use(passport.session());

// homepage route
app.get('/', function(req, res) {
    fs.readFile('index.html', 'utf-8', function(err, page) {
      res.write(page);
      res.end();
    });
});

// routes for charts
var charts = require('./routes/charts_routes.js');
app.use('/charts', charts);

// routes for users
var users = require('./routes/users_routes.js');
app.use('/users', users);

// routes for login/logout
var login = require('./routes/login_routes.js');
app.use('/login', login);
var logout = require('./routes/logout_routes.js');
app.use('/logout', logout);

// routes for likes
var like = require('./routes/likes_routes.js');
app.use('/like', like);

// routes for comments
var comment = require('./routes/comment_routes.js');
app.use('/comment', comment);

// 404 Route
app.use(function(req, res){
  res.status(404).end('404 Error: Page not found');
});

var port = 3000;
app.listen(port, function() {
  console.log("Server listening on http://localhost:" + port);
});

module.exports = app;
