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
    } //end if
    else {
      res.send(200,{user: user});
    } // end else
  });
});

/**
 * TODO
 */
router.put('/user/:userId/following', function (req, res) {
  var userIDToFollow = req.body.userIdToFollow;
  var userId = req.params.userId;
  Users.followUser(userId, userIDToFollow,
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
router.get('/user/:userId/following/charts', function (req, res) {
  var userId = req.params.userId; // TODO: denisli fix
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