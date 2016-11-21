var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Charts = require('../model/chart_model.js');

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

// Look at the link below to view solution to Cannot GET issue
// http://stackoverflow.com/questions/38906961/node-express-cannot-get-route
//
// router.get('/charts', function() {}) will make
// http://localhost:3000/charts/charts handle the GET request
// 
// router.get('/', function() {}) will make
// http://localhost:3000/charts handle the GET request, which is what we want

//GET charts/limit?=10 //home feed
router.get('/',function(req, res, next){
    res.sendStatus(200);
    // console.log(__dirname);
    // res.sendFile(__dirname + '/index.html');
    // var chartId = req.body.id;
    // Charts.find({})
    // .sort({'date':-1})
    // .limit(10)
    // .exec(function(err,charts){
    //     if (err) {
    //         res.send({
    //             success: false,
    //             message: err
    //         }); //end if
    //     } else{
    //         res.send({
    //             sucess:true,
    //             message:charts
    //         })
    //     }//end else
    // });
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
