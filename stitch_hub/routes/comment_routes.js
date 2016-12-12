var express = require('express');
var router = express.Router();
var Comments = require('../model/comment_model.js');


/**
 * Handles a POST request for a Comment.
 *
 * If success, sends status of 200 with message--> success:"comment created!"
 * If error, sends response--> success:false, message:err
 */
router.post('/', function (req, res) {
  var userId = req.body.userId;
  var chartId = req.body.chartId;
  var text = req.body.text;
  Comments.makeComment(userId, chartId, text, function (err) {
    if (err) {
      console.log("error creating like");
      console.log(err);
      res.send(
        {
          success: false,
          message: err
        }
      ); //end if
    } else {
      res.sendStatus(200, {success: "comment created!"}); // send a response
    }
  });
});


/**
 * Handles a GET request for a specific chart's comments.
 *
 * If success, sends a 200 message with message--> success:true, message:comments
 * If error, sends a message--> success:false, message:err, error:"error getting comments"
 */
router.get('/chart/:chartId', function (req, res, next) {
  var chartId = req.params.chartId;
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