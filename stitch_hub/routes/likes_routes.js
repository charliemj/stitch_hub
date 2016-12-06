var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Like = require('../model/like_model.js');
var passport = require('passport');
var Users = require('../model/user_model.js');


router.post('/', function(req, res){
    if (!req.session.username) {
        res.send(400);
        return;
    }


      Like.create(
      {
        user: req.session.userId,
        chart: req.body.chartID
      }, 

      
      function(err, like){
          if (err) {
            res.send(

              {success: false,
              message: err}

              ); //end if
          } else{
            res.sendStatus(200); // send a response
          }
        });
 
});


router.get('/likes',function(req, res, next){
    var chartID = req.body.chartID;
    console.log("chart " + req.body.chartID);
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


module.exports = router;