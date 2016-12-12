var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


var cookieParser = require('cookie-parser');
var session = require('express-session');

// connect with mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database8');


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

app.use(cookieParser());
app.use(session({
  secret: 'supersecret',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
}));

//app.use(express.session({ secret: 'keyboard cat' })); //TODO replace above line with this?


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

// route for current user
var currentUserRouter = require('./routes/current_user_routes.js');
app.use('/currentUser', currentUserRouter);

// routes for login/logout
var login = require('./routes/login_routes.js');
app.use('/login', login);
var logout = require('./routes/logout_routes.js');
app.use('/logout', logout);

// routes for likes
var like = require('./routes/likes_routes.js');
app.use('/like', like);

// routes for comments
var comments = require('./routes/comment_routes.js');
app.use('/comments', comments);

// 404 Route
app.use(function(req, res){
  res.status(404).end('404 Error: Page not found');
});

var port = 3000;
app.listen(port, function() {
  console.log("Server listening on http://localhost:" + port);
});

module.exports = app;
