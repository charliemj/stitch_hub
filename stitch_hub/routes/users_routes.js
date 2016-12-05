var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../model/user_model.js');

router.post('/', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var dob = req.body.dob;
    var email = req.body.email;

    Users.create({
      username: username,
      password: password,
      dob: dob,
      email: email,
    }, function(err, user){
        if (err) {
          res.send({
            success: false,
            message: err
          }); //end if
        } else{
          res.send(200); // send a response
        }
      }
    );
});

module.exports = router;