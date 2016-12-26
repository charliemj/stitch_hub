var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Likes = require('../model/like_model.js');

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

/**
 * Handles POST request for new Like. TODO check + redo these after LIKE overhaul
 *
 * If success, sends status 200.
 * If error, sends response--> success:false, message:err, error:"error creating like"
 */
router.post('/', csrfProtection, function (req, res) {
  var userId = req.session.user._id;
  var chartId = req.body.chartID;
  Likes.likeChart(chartId, userId,
    function (err, like) {
      if (err) {
        res.send(
          {
            success: false,
            message: err,
            error: "error creating like"
          });//end res.sed 
      } //end if
      else {
        res.sendStatus(200); // send a response
      }//end else
    });//end likeChart
});//end router.post

/**
 * Handles GET request for a single Like.
 *
 * If success, sends message--> success:true, message:like
 * If error, sends message--> success:false, message:err
 */
router.get('/chart/:chartId/user/:userId', function (req, res) {
  var chartId = req.params.chartId;
  var userId = req.params.userId;
  Likes.getLike(chartId, userId, function (err, like) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err

      }); //end if
    } else {
      res.send({
        success: true,
        message: like
      });
    }
  });
});

/**
 * Handles DELETE request for Like.
 *
 * If success, sends 200 message with message--> success:"like successfully removed"
 * If error, sends message--> success:false, message:err, error:"problem unliking"
 */
router.delete('/', csrfProtection, function (req, res) {
  var chartId = req.body.chartId;
  var userId = req.session.user._id;
  Likes.unLike(chartId, userId, function (err) {
    if (err) {
      res.send({
        success: false,
        message: err,
        error: "problem unliking"
      }); //end if
    } else {
      res.send(200, {success: "like sucessfully removed"});
    }
  });
});

router.get('/chart/:chartId/count', function (req, res, next) { //TODO is this RESTful?
  var chartId = req.params.chartId;
  console.log("like route");
  console.log("chart " + req.params.chartId);
  Likes.getNumLikes(chartId, function (err, number) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err

      }); //end if
    } else {
      res.send({
        success: true,
        message: number

      });
    } //end else
  });
});

router.get('/user/:userId/likedCharts', function (req, res, next) { //TODO is this RESTful?
  var userId = req.params.userId;
  Likes.getLikedCharts(userId, function (err, docs) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err
      });
    } else {
      console.log('docs ' + docs);
      res.send({
        success: true,
        message: docs
      });
    }//end else
  }); //end Charts.find
});

module.exports = router;

