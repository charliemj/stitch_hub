var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../model/user_model.js');
var session = require('express-session');



router.post('/', function (req, res) {
  console.log(req.body);
  Users.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
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