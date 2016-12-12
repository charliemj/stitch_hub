var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../model/user_model.js');
var session = require('express-session');
var crypto = require('crypto');

/**
 * Handles POST request for login.
 *
 * If success, sends message--> loggedIn:true, userId:ObjectId, userDob:Date
 * If error, sends message--> loggedIn:false, error:"not logged in"
 */
router.post('/', function (req, res) {
  console.log(req.body);
  var hash = crypto.createHash('sha256');
  var password = req.body.password;
  hash.update(password);
  var hashedPassword = hash.digest('hex');
  Users.findOne({ username: req.body.username, password: hashedPassword}, function (err, user) {
    if (user) {
      req.session.username = req.body.username;
      req.session.userId = user._id;
      res.send({loggedIn: true, userId: user._id, userDob: user.dob});
    } else {
      res.send({loggedIn: false,
        error:"not logged in"
      });
    }
  });
});

module.exports = router;