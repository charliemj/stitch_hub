var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var Charts = require('./chart_model.js');
var ObjectId = mongoose.Schema.Types.ObjectId;

var likesSchema = mongoose.Schema({
  chart: {type: ObjectId, ref: "Chart"},
  user: {type: ObjectId, ref: "User"}
});


/**
 * TODO
 * @param chartId
 * @param userId
 * @param callback
 */

likesSchema.statics.canLike = function(userId,callback){
  var canLike = false;
  Users.getUserById(userId,function(err,user){
    if (user){
      canLike = true;
    }
    callback(err, canLike);
  });
};//end of canLike



/**
 * Create a Like given a chart and user.
 * 
 * @param chartId {ObjectId} ID of chart being liked
 * @param userId {ObjectId} ID of user doing the liking
 * @param callback function to execute
 */
likesSchema.statics.likeChart = function (chartId, userId, callback) {
  Likes.canLike(userId, function(err,canLike){
    if (canLike){
      Likes.count({chart: chartId, user: userId}, function (err, history) { //history is either 1 or 0, indicating if a user has liked a particualr chart
        if (err) {
          console.log(err);
          res.send({
            success: false,
            message: err
          }); //end if
        } else {
          if (history === 0) { //they can like the chart
            Likes.create(
              {user: req.session.userId, chart: req.body.chartID}, function (err, like) {
                callback(err, like)
              }
            )
          }
        }
      })//end likes.count
    } //end if canLike
    else{
      callback(err,canLike); //this err is auth prob
    }//end else
  });//end canLike
};//end likeChart

/**
 * Fetch a specific Like.
 *
 * @param chartId {ObjectId} ID of liked chart
 * @param userId {ObjectId} ID of user who liked chart
 * @param callback function to execute
 */
likesSchema.statics.getLike = function(chartId, userId, callback) {
  Likes.findOne({chart: chartId, user: userId}, function(err,like) {
    callback(err,like);
  })
};


/**
 * Remove a Like.
 *
 * @param chartId {ObjectId} ID of liked chart
 * @param userId {ObjectId} ID of user who liked chart
 * @param callback function to execute
 */
likesSchema.statics.unLike = function(chartId, userId, callback) {
  //check if user even liked the chart to begin with
  Likes.getLike(chartId,userId,function(err,like){
    if (err){
      callback(err,like);
    }//end if
    else if (like > 0){
      Likes.remove({chart: chartId, user: userId}, function(err,like) {
        callback(err,like);
      });//end remove
    }//end else if
    else{
      callback(err,like);
    }//end else
  });//end doesLike check
};

/**
 * Get number of likes a chart has.
 *
 * @param chartId {ObjectId} ID of the chart in question
 * @param callback function to execute
 */
likesSchema.statics.getNumLikes = function(chartId,callback) {
  Likes.count({chart: chartId},function(err,number) {
    callback(err,number)
  })
};

/**
 * Get a user's liked charts.
 *
 * @param userId {ObjectId} ID of user in question.
 * @param callback function to execute
 */
likesSchema.statics.getLikedCharts = function(userId,callback) {
  Likes.find({user: userId}, function (err, likes) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err

      });
    } else {
      var likedChartIDs = [];
      for (var i = 0; i < likes.length; i++) {
        likedChartIDs.push(likes[i].chart);
      }
      Charts.find({_id: {$in: likedChartIDs}}, function (err, charts) {
        callback(err, charts)
      })
    }
  })
};

var Likes = mongoose.model("Likes", likesSchema);
module.exports = Likes; //keep at bottom of file