var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Charts = require('../model/chart_model.js');

/**
 * Handles a GET request for all charts by a user.
 *
 * If success, responds with chart list.
 * If error, responds with success message (==true) and error message.
 */
router.get('/author/:userId', function (req, res) {
  var userId = req.params.userId;
    Charts.getChartsByUser(userId,
      function (err, charts) {
        if (err) {
          res.send({
            success: false,
            message: err
          }); //end if
        } else {
          res.send(charts); //TODO change to match pattern above?
        } //end else
      })

});

/**
 * Handles a GET request for a single chart.
 * 
 * If success, responds with success message (==true) and JSON representation of chart.
 * If error, responds with success message (==true) and error message.
 */
router.get('/:chartId', function (req, res) {
  var userId = req.params.userId;
  var chartId = req.params.chartId;
    Charts.getChartById(chartId,
      function (err, chart) {
        if (err) {
          res.send({
            success: false,
            message: err
          }); //end if
        } else {
          res.send({
            success: true,
            message: JSON.stringify(chart)
          });
        } //end else
      })
});

/**
 * Handles the GET request for fetching all the charts.
 *
 * When successful, the response sent back is a JSON which is a list of
 * charts with the same format as in our Chart schema.
 * When an error occurs, the response is a JSON with keys 'success' and
 * 'message'. The 'success' key has a value of false and 'message' key will
 * have the error as the value.
 */
router.get('/', function (req, res/*, next*/) {
  var searchFor = req.query.searchFor ? JSON.parse(req.query.searchFor) : [];
  var filterSizeOn = req.query.filterSizeOn ? JSON.parse(req.query.filterSizeOn) : [];
  var filterTypeOn = req.query.filterTypeOn ? JSON.parse(req.query.filterTypeOn) : [];
  var tokens = req.query.tokens ? JSON.parse(req.query.tokens) : [];
  var userId = req.session.user ? req.session.user._id : null;
    Charts.searchForChart(searchFor, filterSizeOn, filterTypeOn, tokens, userId, function (err, charts) {
      if (err) {
        res.send({
          success: false,
          message: err
        }); //end if
      } else {
        res.send(charts)
      } //end else
    })
});


/**
 * Handles the POST request for creating new chart.
 *
 * After successfully creating new chart, sends 200 message with success message
 * If an error occurs, the response is a JSON with keys 'success' and 'message'. The 'success' key
 * has a value of false and 'message' key have the error as the value
 */
router.post('/', 
  function (req, res, next) {
    if (!req.session.user) { //checks to make sure user is logged in
      res.send(400);
      return;
    }
    var author = req.session.user._id;
    var title = req.body.title; 
    var description = req.body.description;
    var type = req.body.type;
    var rowSize = req.body.rowSize;
    var colSize = req.body.colSize;
    var rows = JSON.parse(req.body.rows);
    var parent = req.body.parent;
    var tags = JSON.parse(req.body.tags);
    var nsfw = req.body.nsfw;
    Charts.makeNewChart(author, title, description, type, rowSize, colSize, rows, parent, tags, nsfw,
      function (err, chart) {
        if (err) {
          console.log("error creating chart! " + err);
          res.send({
            success: false,
            message: err
          }); //end if
        } else {
          res.send(200,{success:"Chart has been posted!"}); // send a response
        }
      }
    );
  });

/**
 * Handles the PUT request for editing a chart's description.
 * Includes user authentication-- only authors of charts can edit their tags.
 *
 * After successfully editing description, sends a response--> updated:true
 * If unsuccessful, sends a response--> success:false,message:err
 */
router.put('/:id/description', function (req, res) {
  var chartId = req.params.id;
  var userId = req.session.user._id;
  var newDescription = req.body.description;
  Charts.editDescription(chartId,userId,newDescription,
    function (err, msg) {
      if (err) {
        res.send({
          success: false,
          message: err
        }); //end if
      } else {
        var updated = (msg != null);
        res.send({updated: updated});
      }
    }
  );
});


/**
 * Handles the PUT request for editing a chart's tags.
 * Includes user authentication-- only the author of a chart can edit its tags.
 *
 * After successfully deleting, sends a response--> updated:true
 * If unsuccessful, sends a response--> success:false,message:err
 */
router.put('/:id/tags', function (req, res) {
  var chartId = req.params.id;
  var userId = req.session.user._id;
  var newTags = req.body.tags;
  Charts.editTags(chartId,userId,newTags,
    function (err, msg) {
      if (err) {
        res.send({
          success: false,
          message: err
        }); //end if
      } else {
        var updated = (msg != null);
        res.send({updated: updated});
      }
    }
  );
});

/**
 * Handles the PUT request for "deleting" a chart.
 *
 * We don't want to delete the chart outright since we need to have the parents
 * available for the remixing lineage, but we will no longer display a deleted chart.
 *
 * After successfully deleting, nothing is returned. If an error occurs, the
 * response is a JSON with keys 'success' and 'message'. The 'success' key
 * has a value of false and 'message' will tell the user that they can't delete a chart
 * that isn't theirs
 */
router.put('/:chartId/is_deleted', function (req, res, next) {
  var chartId = req.params.chartId;
  var userId = req.session.user._id;
  Charts.deleteChart(chartId,userId,function (err, chart) {
    if (err) {
      res.send({
        success: false,
        message: err
      }); //end if
    } else {
      if (chart === null) {
        res.send(400);
      } else {
        //deleted the chart
        res.send({
          success: true,
          message: chart
        });
      }//end if
    }
  })
});

module.exports = router;