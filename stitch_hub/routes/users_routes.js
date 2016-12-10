var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../model/user_model.js');
var Charts = require('../model/chart_model.js');

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Users.findOne({
    _id: id,}, 
    function(err, user) {
    console.log(user);
    if (err) {
      res.send({
        success: false,
        message: err,
        error:"error getting user"
      });
    } //end if
    else {
      res.send(200,{user: user});
    } // end else
  });
});

router.put('/follow', function(req, res) {
  var id = req.body.id;
  console.log("I am: " + req.session.userId);
  Users.findOneAndUpdate(
    { _id: req.session.userId},
    { $addToSet: { following: id } }
  ).exec(function (err, user) {
    if (err) {
      res.send({
        success: false,
        message: err,
        error:"error following"
      }); //end if
    } else{
        if (user) {
          res.send(200,{updated: true});
        } else {
          res.send({updated: false});
        }
    }//end else
  });
});

router.get('/following/charts', function(req, res) {
  if (req.session.userId == null) {
    res.send(400,{error:"you must be logged in to see this!"});
    return;
  }
  Users.findOne({ _id: req.session.userId }, function (err, user) {
    if (err) {
      console.log('There was an eror!' + err);
      res.send({
        success: false,
        message: err,
      });
    } else {
      console.log('Get following in ' + user);
      Charts.find({ author: { $in: user.following } }, function (err, charts) {
        if (err) {
          res.send({
            success: false,
            message: err,
          });
        } else {
          res.send(charts);
        }
      });
    }
  });
});

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
            message: err,
            error:"problem creating user"
          }); //end if
        } else{
          if (user) {
            res.send({registered: true});
          } else {
            res.send({registered: false});
          }
        }
      }
    );
});

module.exports = router;