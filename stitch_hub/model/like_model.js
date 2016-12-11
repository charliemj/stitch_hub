var mongoose = require('mongoose');
// things we can easily validate with this package: https://www.npmjs.com/package/mongoose-validators
// can validate one or multiple things
// to validate multiple fields, put in a list

// single validator like this:
// var Schema = new mongoose.Schema({
//     email: {type: String, validate: validators.isEmail()}
// });

// multiple validators like this:
// var Schema = new mongoose.Schema({
//     username: {type: String, validate: [validators.isAlphanumeric(), validators.isLength(2, 60)]}
// });

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
likesSchema.statics.likeChart = function (chartId, userId, callback) {
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
          {user: userId, chart: chartId}, function (err, like) {
            callback(err, like)
          }
        )
      }
    }
  })
};

/**
 * TODO
 * @param chartId
 * @param userId
 * @param callback
 */
likesSchema.statics.getLike = function(chartId, userId, callback) {
  Likes.findOne({chart: chartId, user: userId}, function(err,like) {
    callback(err,like);
  })
};


/**
 * TODO
 * @param chartId
 * @param userId
 * @param callback
 */
likesSchema.statics.unLike = function(chartId, userId, callback) {
  //check if user even liked the chart to begin with
  Likes.getLike(chartId,userId,function(err,like){
    if (err){
      callback(err,like);
    }//end if
    else if (like != null){
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
 * TODO
 * @param chartId
 * @param callback
 */
likesSchema.statics.getNumLikes = function(chartId,callback) {
  Likes.count({chart: chartId},function(err,number) {
    callback(err,number);
  })
};

/**
 * TODO
 * @param userId
 * @param callback
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