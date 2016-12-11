var express = require('express');
var router = express.Router();
var Comments = require('../model/comment_model.js');
var passport = require('passport');


router.post('/', function (req, res) {
  if (!req.session.username) {
    res.send(400, {msg: "user not logged in"});
    return;
  }
  var userId = req.session.userId;
  var chartId = req.body.chartID;
  var text = req.body.text;
  Comments.makeComment(userId, chartId, text, function (err) {
    if (err) {
      console.log("error creating like");
      console.log(err);
      res.send(
        {
          success: false,
          message: err,
          error: "error creating like"
        }
      ); //end if
    } else {
      res.sendStatus(200, {sucess: "comment created!"}); // send a response
    }
  });
});


router.get('/', function (req, res, next) {
  var chartId = req.query.chartID;
  console.log("chart " + req.query.chartID);
  Comments.getChartComments(chartId, function (err, comments) {
      if (err) {
        console.log(err);
        res.send({
          success: false,
          message: err,
          error: "error getting comments"
        }); //end if
      } else {
        res.send(200, {
          success: true,
          message: comments
        });
      } //end else
    })
});


module.exports = router;