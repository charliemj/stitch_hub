var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Charts = require('../models/chart_model.js');

//GET charts/:id
router.get('/charts/:id',function(req, res, next){
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
        }//end else
    })
});

//GET charts/limit?=10 //home feed
router.get('/charts',function(req, res, next){
    var chartId = req.body.id;
    Charts.find({})
    .sort({'date':-1})
    .limit(10)
    .exec(function(err,charts){
        if (err) {
            res.send({
                success: false,
                message: err
            }); //end if
        } else{
            res.send({
                sucess:true,
                message:charts
            })
        }//end else
    });
});


//POST charts/
router.post('/charts', function(req,res, next){
    var title = req.body.title; //make sure view is named correctly
    var description = req.body.description;
    // var date = 
    var type = req.body.type;
    var rowSize = req.body.rowSize;
    var colSize = req.body.colSize;
    var rows = req.body.rows;
    var parent = req.body.parent;

    Charts.create({"title":title,"description":description,
        "type":type,"rowSize":rowSize,"colSize":colSize,"rows":rows,"parent":parent}, 
        function(err,chart){
            if (err) {
                res.send({
                    success: false,
                    message: err
                }); //end if
            } else{
                res.redirect("/"); //eventually want to redirect to newly created chart page
            }
        }
    );
});




module.exports = router; //goes at bottom of file .
