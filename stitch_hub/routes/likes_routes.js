var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Like = require('../model/like_model.js');
var passport = require('passport');
var Users = require('../model/user_model.js');
var Charts = require('../model/chart_model.js');


router.post('/', function(req, res){

    if (!req.session.username) {
        res.send(400);
        return;
    }

    Like.count({chart:req.body.chartID, user:req.session.userId}, function(err, history){
      if (err) {
             console.log(err);
             res.send({
                 success: false,
                 message: err

             }); //end if
         } else{
            console.log("this is history");
            console.log(history);
            if (history===0){
                Like.create(
                      {user: req.session.userId, chart: req.body.chartID}, 
                      function(err, like){
                          if (err) {
                            console.log("error creating like");
                            console.log(err);
                            res.send(
                              {success: false,
                              message: err}
                              ); //end if
                          } else{
                            res.sendStatus(200); // send a response
                          }
                        });
                };
            
        }; //end else
    });
});


router.get('/', function(req, res) {
  var chartId = req.query.chartId;
  var userId = req.session.userId;
  Like.findOne({ chart: chartId, user: userId })
  .exec(function(err, like) {
    if (err) {
       console.log(err);
       res.send({
           success: false,
           message: err

       }); //end if
    } else {
      res.send(like);
    }
  });
});

router.delete('/', function(req, res) {
  var chartId = req.body.chartId;
  var userId = req.session.userId;
  Like.remove({ chart: chartId, user: userId }, function (err) {
    if (err) {
       res.send({
           success: false,
           message: err

       }); //end if
    } else {
      res.send(200);
    }
  });
});


router.get('/likes',function(req, res, next){
    var chartID = req.query.chartID;
    console.log("chart " + req.query.chartID);
    Like
    .count({chart:chartID}, function(err,number){
         if (err) {
             console.log(err);
             res.send({
                 success: false,
                 message: err

             }); //end if
         } else{
            console.log("there were "+ number);
            res.send({
              success: true,
              message: number

          });
        } //end else
    })
});

router.get('/likedcharts',function(req, res, next){
    var userID = req.session.userId;
    Like.find({user:userID}, function(err,likes){
         if (err) {
             console.log(err);
             res.send({
                 success: false,
                 message: err

             }); 
         } else{
            
            var likedChartIDs = [];
            for (var i = 0; i<likes.length; i++){
              likedChartIDs.push(likes[i].chart);
            }
            console.log("liked IDs: " + likedChartIDs);
            Charts.find({_id: {$in: likedChartIDs}}, function(err, docs){
              if (err) {
                console.log(err);
                res.send({
                  success: false,
                  message: err});
              } else{
                console.log('docs ' + docs );
                res.send({

                  success: true,
                  message: docs});
              }


            })


            
        } //end else
    })
});

module.exports = router;