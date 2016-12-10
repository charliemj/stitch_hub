var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Charts = require('../model/chart_model.js');
var passport = require('passport');

/**
* Handles the GET request for a chart with a specific id.
*
* When successful, the response is JSON. Most importantly, the value of the
* 'message' key is a chart following the same format as the schema in mongoose.
* When an error occurs, the response is a JSON with keys 'success' and
* 'message'. The 'success' key has a value of false and 'message' key will
* have the error as the value.
*/
router.get('/parent',function(req, res, next){
    var chartId = req.query.chartId;
    //var chartId = req.params.chartId;
    //var chartId = req.body.chartId;
    console.log("looking for chart id: " + chartId);
    Charts.findOne({_id:chartId})
    .exec(function(err,chart){
        
         if (err) {
            console.log("routing err, chart: " + err + chart);
             res.json({
                 success: false,
                 message: err
             }); //end if
         } else{
            res.json({
                success:true,
                message:chart
            })
        } //end else
    })
});

router.get('/user/:userId', function(req, res) {
    var userId = req.params.userId;
    Charts.find({author: userId, is_deleted:false})
    .exec(function(err, charts) {
        if (err) {
             res.send({
                 success: false,
                 message: err,
                 error: "this chart doesn't exist!"
             }); //end if
        } else{
            res.send(charts);
        } //end else
    });
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
router.get('/',function(req, res/*, next*/){
    var searchFor = req.query.searchFor ? JSON.parse(req.query.searchFor) : [];
    var filterSizeOn = req.query.filterSizeOn ? JSON.parse(req.query.filterSizeOn) : [];
    var filterTypeOn = req.query.filterTypeOn ? JSON.parse(req.query.filterTypeOn) : [];
    var tokens = req.query.tokens ? JSON.parse(req.query.tokens) : [];
    searchRegex = tokens.map(function(token) {
        return new RegExp('\\b' + token + '\\b', 'i'); // consider as substring
    });

    // construct the query based on the request parameters
    // overall structure of the query is
    // { $or: [ {property1: {$in: tokens}}, ..., {propertyN: {$in: tokens}} ] }
    var searchForFilter = {};
    if (searchFor.length > 0) {
        var propertyQueries = [];
        searchForFilter = {$or: propertyQueries};
        searchFor.forEach(function(property) {
            var propertyQuery = {};
            propertyQuery[property] = { $in: searchRegex };
            propertyQueries.push(propertyQuery);
        });
    }
    if (filterTypeOn.length > 0) {
        searchForFilter.type = { $in: filterTypeOn }
    }
    var sizeFilter = {};
    if (filterSizeOn.length > 0) {
        var SMALL_SIZE = 400;
        var MEDIUM_SIZE = 1600;
        var sizeConditions = [];
        sizeFilter = {$or: sizeConditions };
        filterSizeOn.forEach(function(sizeType) {
            if (sizeType == 'small') {
                sizeConditions.push({ size: { $lte: SMALL_SIZE } });
            } else if (sizeType == 'medium') {
                sizeConditions.push({ size: { $gt: SMALL_SIZE, $lte: MEDIUM_SIZE } });
            } else if (sizeType == 'large') {
                sizeConditions.push({ size: { $gt: MEDIUM_SIZE } });
            }
        })
    }
    var matchQuery = { $and: [ searchForFilter, { is_deleted: false } ] };

    // perform query
    Charts.aggregate([ 
        { $match: matchQuery },
        //instead of projecting, we could also just store the size in the chart when handling post
        { $project:
            {
                _id: "$_id",
                author: "$author",
                date: "$date",
                title: "$title",
                description: "$description",
                type: "$type",
                rowSize: "$rowSize",
                colSize: "$colSize",
                size: { $multiply: ["$rowSize", "$colSize"]},
                rows: "$rows",
                parent: "$parent",
                tags: "$tags",
                is_deleted: "$is_deleted",
                nsfw: "$nsfw",
            }
        },
        { $match: sizeFilter },
        { $sort: {'date':-1} },
    ]).exec(function(err,charts){
        if (err) {
            res.send({
                success: false,
                message: err,
                error: "Problem getting chart!"
            }); //end if
        } else{
            res.send(charts)
        } //end else
    });
});


/** 
* Handles the POST request for storing a chart.
*
* After successfully storing, nothing is returned. If an error occurs, the
* response is a JSON with keys 'success' and 'message'. The 'success' key
* has a value of false and 'message' key have the error as the value
*/
router.post('/', /*passport.authenticate('local',{failureRedirect: '/login'}),*/
    function(req,res, next){
    if (!req.session.username) {
        res.send(400);
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

    Charts.create({author:author,title:title,description:description,tags:tags,nsfw:nsfw,
        type:type,rowSize:rowSize,colSize:colSize,rows:rows,parent:parent,is_deleted: false}, 
        function(err,chart){
            if (err) {
                res.send({
                    success: false,
                    message: err,
                    error: "Problem posing the chart!"
                }); //end if
            } else{
                res.send(200,
                    {success: "Your chart is posted!"}); // end  of send a response
            }
        }
    );
});

router.put('/:id/description', function (req, res) {
    // check if the user is the user who posted the chart
    console.log(req.params.id);
    Charts.findOneAndUpdate(
        {_id:req.params.id}, // NOTE LOWERCASE d 
        {description: req.body.description}, 
        function(err,chart){
            if (err){
                res.send(401,{
                    success: false,
                    message: err,
                    error:"You can't update this!"
                }); //end if
            } else {
                var updated = (chart != null);
                res.send(200,{ updated: updated });
            }
        }
    );
});

router.put('/:id/tags', function (req, res) {
    // chart if the user is the user who posted the chart
    Charts.findOneAndUpdate(
        {_id:req.params.id}, // NOTE LOWERCASE d
        {tags: req.body.tags}, 
        function(err,chart){
            if (err){
                res.send(401,{
                    success: false,
                    message: err,
                    error:"You can't update this!"
                }); //end if
            } else {
                var updated = (chart != null);
                res.send(200,{ updated: updated });
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
router.put('/',function(req,res,next) {
    //check if user is the user who posted the chart
    console.log(req.body.chartID, req.session.userId);
    Charts.findOneAndUpdate(
        {_id:req.body.chartID,author:req.session.userId}, 
        {is_deleted: true},
        {new: true},
        function(err,chart){
            if (err){
                res.send({
                    success: false,
                    message: err,
                    error:"You can't delete this!"
                }); //end if
            } else {
                if (chart===null){
                    res.send(400);
                } else{
                    //delete the chart
                    res.send(200,{
                        success: true,
                        message: chart
                        });
                }//end if
            }
        }
    );
});




module.exports = router;