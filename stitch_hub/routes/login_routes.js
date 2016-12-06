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
<<<<<<< Updated upstream
      res.send({loggedIn: true, username: req.body.username, userId: user._id});
=======
<<<<<<< HEAD
      req.session.userId = user._id; //remove if doesn't work
      // app.locals({
      //         user: {
      //           id: user._id
      //       }
      //   });
    // console.log(user._id,"user id?");
    // console.log(req.session.userId);
      res.send({loggedIn: true,userId: user._id });
=======
      req.session.userId = user._id;
      res.send({loggedIn: true, userId: user._id});
>>>>>>> bc9c9714d76516a7e6fd253115d129ff57f7249b
>>>>>>> Stashed changes
    } else {
      res.send({loggedIn: false});
    }
  });
});

module.exports = router;