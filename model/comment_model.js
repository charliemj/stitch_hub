var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var Users = require('./user_model.js');

var ObjectId = mongoose.Schema.Types.ObjectId;

var commentSchema = mongoose.Schema({
  user: [{type: ObjectId, ref: "User"}],
  chart: {type: ObjectId, ref: "Chart"},
  text: String 
});



/**
 * Sees if user can comment on chart.
 *
 * @param userId {ObjectId} ID of user
 * @param callback function to execute
 */
commentSchema.statics.canComment = function (userId,callback){
  var canComment = false;
  Users.getUserById(userId,function(err,user){
    if (user){
      canComment = true;
    }
    callback(err, canComment);
  });
};//end canComment



/**
 * Creates a new comment.
 *
 * @param userId {ObjectId} ID of the author of the comment
 * @param chartId {ObjectId} ID of the chart being commented on
 * @param text {String} text of comment
 * @param callback function to execute
 */
commentSchema.statics.makeComment = function (userId, chartId, text, callback) {
  Comment.canComment(userId,function(err,canComment){
    if (canComment){
      Comment.create(
        {user: userId, chart: chartId, text: text}, function (err,comment) {
          callback(err,comment);
        });
    }//end if
    else{
      callback(err, canComment);
    }//end else
  });//end canComment
};

/**
 * Get all comments made on chart.
 *
 * @param chartId {ObjectId} ID of chart in question
 * @param callback function to execute
 */
commentSchema.statics.getChartComments = function(chartId, callback) {
  Comment.find({chart: chartId}, function(err, comments) {
    callback(err,comments);
  });
};

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment; //keep at bottom of file
