var mongoose = require('mongoose');
var validators = require('mongoose-validators');

var ObjectId = mongoose.Schema.Types.ObjectId;

var commentSchema = mongoose.Schema({
  user: [{type: ObjectId, ref: "User"}],
  chart: {type: ObjectId, ref: "Chart"},
  text: String //do we want to impose a length on this? if so, we can add a validator
});

/**
 * Creates a new comment.
 *
 * @param userId {ObjectId} ID of the author of the comment
 * @param chartId {ObjectId} ID of the chart being commented on
 * @param text {String} text of comment
 * @param callback function to execute
 */
commentSchema.statics.makeComment = function (userId, chartId, text, callback) {
  Comment.create(
    {user: userId, chart: chartId, text: text}, function (err) {
      callback(err)
    })
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
  })
};

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment; //keep at bottom of file


