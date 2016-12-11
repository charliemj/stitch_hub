var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Likes = require('../model/like_model.js');


router.post('/', function (req, res) {
  var userId = req.session.userId;
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

router.delete('/', function (req, res) {
  var chartId = req.body.chartId;
  var userId = req.session.userId;
  Likes.unLike(chartId, userId, function (err) {
    if (err) {
      res.send({
        success: false,
        message: err,
        error: "problem unliking"
      }); //end if
    } else {
      res.send(200, {sucess: "like sucessfully removed"});
    }
  });
});

router.get('/chart/:chartId/count', function (req, res, next) { //TODO is this RESTful?
  var chartId = req.params.chartID;
  console.log("like route");
  console.log("chart " + req.query.chartID);
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