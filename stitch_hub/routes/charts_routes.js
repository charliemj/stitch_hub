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
router.get('/:id',function(req, res, next){
    var chartId = req.body.id;
    Charts.find({_id:chartId})
    .exec(function(err,chart){
         if (err) {
             res.send({
                 success: false,
                 message: err
             }); //end if
         } else{
            res.send({
                sucess:true,
                message:chart
            })
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
router.get('/',function(req, res/*, next*/){
    Charts.find({})
    .sort({'date':-1})
    .exec(function(err,charts){
        if (err) {
            res.send({
                success: false,
                message: err
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
    var title = req.body.title; //make sure view is named correctly
    var description = req.body.description;
    var type = req.body.type;
    var rowSize = req.body.rowSize;
    var colSize = req.body.colSize;
    var rows = JSON.parse(req.body.rows);
    var parent = req.body.parent;


    Charts.create({author:author,title:title,description:description,
        type:type,rowSize:rowSize,colSize:colSize,rows:rows,parent:parent,is_deleted: false}, 
        function(err,chart){
            if (err) {
                res.send({
                    success: false,
                    message: err
                }); //end if
            } else{
                res.send(200); // send a response
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
router.put('/',function(req,res,next){
    //check if user is the user who posted the chart
    var chart_to_del = Charts.find({_id:req.body.chartID,author:req.session.userId})
    if (chart_to_del.length === 1){
        //delete the chart
        Chart.update(chart_to_del,{is_deleted: true});
    }//end if
    else{
        //trying to delete chart they didn't make
        res.send({
                    success: false,
                    message: "Don't have permission to delete this!"
                });
    }//end else
    
});




module.exports = router;