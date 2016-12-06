var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Users = require('../model/user_model.js');
var session = require('express-session');



router.post('/', function (req, res) {
  Users.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
    // console.log(req.session);
    if (user) {
      req.session.username = req.body.username;
      req.session.userId = user._id; //remove if doesn't work
      // app.locals({
      //         user: {
      //           id: user._id
      //       }
      //   });
    // console.log(user._id,"user id?");
    // console.log(req.session.userId);
      res.send({loggedIn: true,userId: user._id });
    } else {
      res.send({loggedIn: false});
    }
  });
});

module.exports = router;