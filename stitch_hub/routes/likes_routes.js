var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Like = require('../model/like_model.js');
var passport = require('passport');
var Users = require('../model/user_model.js');


router.post('/', function(req, res){
<<<<<<< HEAD
    var chart = ;
    
    Users.findOne(username: req.body.username, function(err,user){
        if (user) {
            // req.session.username = req.body.username; //don't need
            req.session.userId = user._id;
            res.send({loggedIn: true});


            Like.create({
              user: req.session.userId,
              chart: req.body.chartID
            }, function(err, like){
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
=======
    if (!req.session.username) {
        res.send(400);
        return;
    }


      Like.create({
        user: req.session.userId,
        chart: req.body.chartID
      }, function(err, like){
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
>>>>>>> master

    } else { //no user
      res.send({loggedIn: false});
    }});
 
});

module.exports = router;