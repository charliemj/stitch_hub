var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');

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

// 404 Route
app.use(function(req, res){
  res.status(404).end('404 Error: Page not found');
});

var port = 3000;
app.listen(port, function() {
  console.log("Server listening on http://localhost:" + port);
});

module.exports = app;
