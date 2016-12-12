var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../model/user_model.js');
var session = require('express-session');
var passwordSecurer = require('./password_securer.js')();

/**
 * Handles POST request for login.
 *
 * If success, sends message--> loggedIn:true, userId:ObjectId, userDob:Date
 * If error, sends message--> loggedIn:false, error:"not logged in"
 */
router.post('/', function (req, res) {
  console.log(req.body);
  var password = req.body.password;
  Users.findOne({ username: req.body.username }, function (err, user) {
    if (user) {
      var hashedPassword = user.password;
      var salt = user.salt;
      if (passwordSecurer.validateHash(hashedPassword, salt, password)) {
        req.session.user = user;
        delete req.session.user.password;
        delete req.session.user.salt;
        res.send({loggedIn: true, user: user});
      } else {
        res.send({
          loggedIn: false,
          error: 'not logged in',
        });
      }
    } else {
      res.send({
        loggedIn: false,
        error: 'not logged in',
      });
    }
  });
});

module.exports = router;