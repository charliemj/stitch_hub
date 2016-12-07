var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Users = require('../model/user_model.js');
var session = require('express-session');



router.post('/', function (req, res) {
  Users.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
    if (user) {
      req.session.username = req.body.username;
      // res.send({loggedIn: true, username: req.body.username, userId: user._id});

      req.session.userId = user._id; 
      console.log("req.session.userId",req.session.userId, "user._id", user._id);
      res.send({loggedIn: true,userId: user._id });
      

    } else {
      res.send({loggedIn: false});
    }
  });
});

module.exports = router;