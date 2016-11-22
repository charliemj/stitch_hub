var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


// var routes = require('./routes/index');


var mongoose = require('mongoose');

//**to test database need to specify location of database below!
mongoose.connect('mongodb://localhost/my_database8');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected");
});

var app = express();


////// NEED TO UPDATE THIS 
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// app.use('/', routes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// homepage
app.get('/', function(req, res) {
    fs.readFile('index.html', 'utf-8', function(err, page) {
      res.write(page);
      res.end();
    });
});

var charts = require('./routes/charts_routes.js');
app.use('/charts', charts);

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

var port = 3000;
app.listen(port, function() {
  console.log("Server listening on http://localhost:" + port);
});

module.exports = app;
