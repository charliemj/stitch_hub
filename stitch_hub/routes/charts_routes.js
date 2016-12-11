var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Charts = require('../model/chart_model.js');
var passport = require('passport');

/**
 * gets all charts by a user
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
 * gets a single chart
 */
router.get('/:chartId', function (req, res) {
  var chartId = req.params.chartId;
  Charts.getChartById(chartId,
    function (err, chart) {
      if (err) {
        res.send({
          success: false,
          message: err
        }); //end if
      } else {
        console.log(chart);
        res.send({
          success: true,
          message: JSON.stringify(chart)
        }); //TODO change to match pattern above?
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
  Charts.searchForChart(searchFor,filterSizeOn,filterTypeOn, tokens, function (err, charts) {
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
 * Handles the POST request for storing a chart.
 *
 * After successfully storing, nothing is returned. If an error occurs, the
 * response is a JSON with keys 'success' and 'message'. The 'success' key
 * has a value of false and 'message' key have the error as the value
 */
router.post('/', /*passport.authenticate('local',{failureRedirect: '/login'}),*/
  function (req, res, next) {
    if (!req.session.username) { //checks to make sure user is logged in
      res.send(400),{msg:"You need to log in to make a chart!"};
      return;
    }
    var author = req.session.userId;
    var title = req.body.title; 
    var description = req.body.description;
    var type = req.body.type;
    var rowSize = req.body.rowSize;
    var colSize = req.body.colSize;
    var rows = JSON.parse(req.body.rows);
    var parent = req.body.parent;
    var tags = JSON.parse(req.body.tags);
    var nsfw = req.body.nsfw;


    Charts.makeNewChart(author, title, description, type, rowSize, colSize, rows, parent, tags,
      function (err, chart) {
        if (err) {
          console.log("error creating chart! " + err);
          res.send({
            success: false,
            message: err
          }); //end if
        } else {
          res.send(200,{sucess:"Chart has been posted!"}); // send a response
        }
      }
    );
  });

/**
 * TODO
 */
router.put('/:id/description', function (req, res) {
  // TODO authentication: check if the user is the user who posted the chart
  var chartId = req.params.id;
  var userId = req.session.username;
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
 * TODO
 */
router.put('/:id/tags', function (req, res) {
  // TODO authentication: check if the user is the user who posted the chart
  var chartId = req.params.id;
  var userId = req.session.username;
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

// "Deleting" a chart 
/**
 * Handles the PUT request for "deleting" a chart. We don't want to delete the chart outright
 * Since we need to have the parents available for the remixing lineage, but we will
 * no longer display a deleted chart
 * After successfully deleting, nothing is returned. If an error occurs, the
 * response is a JSON with keys 'success' and 'message'. The 'success' key
 * has a value of false and 'message' will tell the user that they can't delete a chart
 * that isn'theirs
 */
router.put('/', function (req, res, next) {
  //TODO authentication: check if user is the user who posted the chart
  var chartId = req.body.chartID;
  var userId = req.session.userId;
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