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
  Likes.count({chart: chartId, user: userId}, function (err, history) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err
      }); //end if
    } else {
      console.log("this is history");
      console.log(history);
      if (history === 0) {
        Likes.create(
          {user: req.session.userId, chart: req.body.chartID}, function (err, like) {
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
  Likes.remove({chart: chartId, user: userId}, function(err,like) {
    callback(err,like);
  })
};

/**
 * TODO
 * @param chartId
 * @param callback
 */
likesSchema.statics.getNumLikes = function(chartId,callback) {
  Likes.count({chart: chartID},function(err,number) {
    callback(err,number)
  })
};

/**
 * TODO
 * @param userId
 * @param callback
 */
likesSchema.statics.getLikedCharts = function(userId,callback) {
  Likes.find({user: userID}, function (err, likes) {
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
      console.log("liked IDs: " + likedChartIDs);
      Charts.find({_id: {$in: likedChartIDs}}, function (err, charts) {
        callback(err, charts)
      })
    }
  })
};

var Likes = mongoose.model("Likes", likesSchema);
module.exports = Likes; //keep at bottom of file