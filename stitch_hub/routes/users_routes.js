var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../model/user_model.js');
var Charts = require('../model/chart_model.js');

/**
 * TODO
 */
router.get('/:id', function (req, res) {
  var userId = req.params.id;
  Users.getUserById(userId, function (err, user) {
    if (err) {
      res.send({
        success: false,
        message: err
      });
    } else {
      res.send({user: user});
    }
  });
});

/**
 * TODO
 */
router.put('/follow', function (req, res) {
  var userIDToFollow = req.body.id;
  var currentUserID = req.session.userId;
  Users.followUser(currentUserID, userIDToFollow,
    function (err, user) {
      if (err) {
        res.send({
          success: false,
          message: err
        }); //end if
      } else {
        if (user) {
          res.send({updated: true});
        } else {
          res.send({updated: false});
        }
      }
    });
});

/**
 * TODO
 */
router.get('/following/charts', function (req, res) {
  if (req.session.userId == null) {
    res.send(400);
    return;
  }
  var userId = req.session.userId;
  Users.getFollowersCharts(userId,
    function (err, charts) {
      if (err) {
        res.send({
          success: false,
          message: err
        });
      } else {
        res.send(charts);
      }
    });
});

/**
 * TODO
 */
router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var dob = req.body.dob;
  var email = req.body.email;

  Users.createUser(username, password, dob, email, function (err, user) {
      if (err) {
        res.send({
          success: false,
          message: err
        }); //end if
      } else {
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