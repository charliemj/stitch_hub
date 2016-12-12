var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var Users = require('../model/user_model.js');

var ObjectId = mongoose.Schema.Types.ObjectId;

var validTypes = ["CROSS_STITCH", "KNIT_V", "KNIT_H", "CROCHET_V", "CROCHET_H"];

var chartSchema = mongoose.Schema({
    title: {type:String, validate: [validators.isLength(0,16)]},
    description: {type:String, validate: [validators.isLength(0,100)]},
    date: { type: Date, default: Date.now,validate: [validators.isDate()] },
    type: {type:String, enum: validTypes},
    rowSize: {type:Number, min:1, max:70},
    colSize: {type:Number, min:1, max:70},
    size: Number,
    rows:[[{type:String, validate: validators.isHexColor()}]],
    parent: {type:ObjectId, ref:"Chart"},
    is_deleted: Boolean,
    nsfw: Boolean,
    tags: [String],
    comments: [{type:ObjectId, ref:"Comment"}],
    author: {type: ObjectId, ref:"User"}
});

/**
 * Fetches chart information for a chart, given that chart's ID
 *
 * @param chartId {ObjectId} the ID of the chart to fetch
 * @param userId {ObjectId} the ID of the current user
 * @param callback function to execute
 */
chartSchema.statics.getChartById = function (chartId, userId, callback) {
  Charts.findOne({_id: chartId}, function (err, chart) {
    if (err) {
      callback(err)
    } else {
      callback(null, chart)
    }
  })
};


/**
 * Fetches all charts authored by a user.
 * 
 * @param userId ID of the user
 * @param callback function to execute
 */
chartSchema.statics.getChartsByUser = function (userId, callback) {
  Charts.find({
    author: userId,
    is_deleted: false
  }, function (err, charts) {
    if (err) {
      callback(err) 
    } else {
      callback(null, charts)
    }
  })
};

/**
 * Get all charts authored by a user's followers.
 *
 * @param userId {ObjectId} ID of
 * @param callback function to execute
 */
chartSchema.statics.getFollowersCharts = function (userId, callback) {
  Users.isLoggedIn(userId, function(err,isLoggedIn){
    if (isLoggedIn){
      Users.getUserById(userId, function(err,user) {
        if (err) {
          console.log('There was an error!' + err);
          res.send({
            success: false,
            message: err
          });
        } else {
          console.log('Get following in ' + user);
          Charts.find({author: {$in: user.following}},
            function (err, charts) {
              callback(err, charts)
            })
        }
      })
    }//end if
    else{
      callback(err,isLoggedIn);
    }//end else
  });//end isLoggedIn
};



/**
 * Searches for charts that meet parameters' specifications.
 *
 * @param searchFor [{String}] list of properties that we should search amongst (one of tags, title, author, and description)
 * @param filterSizeOn [{String}] the size of charts to filter on ('small', 'medium', 'large')
 * @param filterTypeOn [{String}] chart types to filter on (CROSS_STITCH, KNIT_V, KNIT_H, CROCHET_V, CROCHET_H)
 * @param tokens [{String}] list of words to search amongst. They should be single words and all lowercase
 * @param userId {ObjectId} ID of current user
 * @param callback function to execute
 */
chartSchema.statics.searchForChart = function (searchFor, filterSizeOn, filterTypeOn, tokens, userId, callback) {
  searchRegex = tokens.map(function (token) {
    return new RegExp('\\b' + token + '\\b', 'i'); // consider as substring
  });
  var allowNSFW = false;
  Users.getUserById(userId, function(err, user) { //TODO add NSFW to search filtering
    if (user) {
      var birthday = +new Date(user.dob);
      var age = ~~((Date.now() - birthday) / (31557600000));
      var isAdult = age >= 18;
      if (isAdult) {
        allowNSFW = true
      }
    }
  
    // construct the query based on the request parameters
    // overall structure of the query is
    // { $or: [ {property1: {$in: tokens}}, ..., {propertyN: {$in: tokens}} ] }
    var searchForFilter = {};
    if (searchFor.length > 0) {
      var propertyQueries = [];
      searchForFilter = {$or: propertyQueries};
      searchFor.forEach(function (property) {
        var propertyQuery = {};
        propertyQuery[property] = {$in: searchRegex};
        propertyQueries.push(propertyQuery);
      });
    }
    if (filterTypeOn.length > 0) {
      searchForFilter.type = {$in: filterTypeOn}
    }
    var sizeFilter = {};
    if (filterSizeOn.length > 0) {
      var SMALL_SIZE = 400;
      var MEDIUM_SIZE = 1600;
      var sizeConditions = [];
      sizeFilter = {$or: sizeConditions};
      filterSizeOn.forEach(function (sizeType) {
        if (sizeType == 'small') {
          sizeConditions.push({size: {$lte: SMALL_SIZE}});
        } else if (sizeType == 'medium') {
          sizeConditions.push({size: {$gt: SMALL_SIZE, $lte: MEDIUM_SIZE}});
        } else if (sizeType == 'large') {
          sizeConditions.push({size: {$gt: MEDIUM_SIZE}});
        }
      })
    }
    var matchQuery = {$and: [searchForFilter, {is_deleted: false}]};
    var ageFilter = {};
    if (!allowNSFW) {
      var author = null;
      if (user) {
        ageFilter = { $or: [{nsfw: false}, {author: user._id}] };
        console.log(ageFilter);
      } else {
        ageFilter = { nsfw: false };
      }
    }
    // perform query
    Charts.aggregate([
      {$match: matchQuery},
      {$match: sizeFilter},
      {$match: ageFilter},
      {$sort: {'date': -1}}
    ], function(err,charts) {
      callback(err,charts);
    });
  });
};


/**
 * Creates and saves a new chart.
 *
 * @param author {ObjectId} ID of the author {User}
 * @param title {String} title of the chart
 * @param description {String} description of the chart
 * @param type {String} type of chart, must be one of the following: ["CROSS_STITCH", "KNIT_V", "KNIT_H", "CROCHET_V", "CROCHET_H"]
 * @param rowSize {Number} number of rows in the chart
 * @param colSize {Number} number of columns in the chart
 * @param rows [[{String}]] list of list of Hex values. Each list inside main list represents a row.
 * @param parent {ObjectId} ID of the parent {Chart}, null if it has no parent
 * @param tags [{String}] list of tags assigned to the chart
 * @param nsfw {Boolean} whether chart is safe for work or not (18+). true=nsfw, false=sfw
 * @param callback function to execute
 */
chartSchema.statics.makeNewChart = function(author, title, description, type, rowSize, colSize, rows, parent, tags, nsfw, callback) {
  Charts.create({
    author: author, title: title, description: description, tags: tags, nsfw: nsfw,
    type: type, rowSize: rowSize, colSize: colSize, rows: rows, size: (rowSize * colSize), parent: parent, is_deleted: false
  }, function(err,chart) {
    callback(err,chart);
  })
};


/**
 * Checks if a user can edit a chart (ie: if the user in question is the author of the chart).
 *
 * @param chartId {ObjectId} ID of the chart in question
 * @param userId {ObjectId} ID of the user in question
 * @param callback function to execute
 */
chartSchema.statics.checkIfCanEdit = function(chartId,userId,callback){
  Charts.getChartById(chartId,userId,function (err, chart) {
    var chartAuthor = null;
    var canEdit = false;
    if (err) {
      callback(err,canEdit);
    } //end if
    else {
      chartAuthor = chart.author;
    } //end else

    if (userId == chartAuthor){
      canEdit = true;
    }
    callback(err,canEdit);
  });//end of Charts.getChartById
};//end of checkIfCanEdit


/**
 * Attempts to edit the description of a chart.
 * If currently logged-in user has permission to edit the chart description, edits the chart description.
 * Else, returns and error.
 *
 * @param chartId {ObjectId} ID of the chart in question
 * @param userId {ObjectId} ID of the user in question
 * @param newDescription {String} revised description of the chart
 * @param callback function to execute
 */
chartSchema.statics.editDescription = function(chartId,userId,newDescription,callback) {
  Charts.checkIfCanEdit(chartId,userId,function(err,canEdit){
    if (canEdit){
      Charts.findOneAndUpdate(
        {_id: chartId}, // NOTE LOWERCASE d
        {description: newDescription},
        {new: true},
        function(err,chart){
          callback(err,chart); //this err is database prob
        }//end function
      ) //end findoneandupdate
    }//end if
    else{
      //the person doesn't have authorization to edit
        callback(err,canEdit); //this err is auth prob
    }//end else
  });//end checkIfCanEdit
};//end of editDescription


/**
 * Attempts to edit the tags of a chart.
 * If currently logged-in user has permission to edit the chart tags, edits the chart tags.
 * Else, returns and error.
 *
 * @param chartId {ObjectId} ID of the chart in question
 * @param userId {ObjectId} ID of the user in question
 * @param newTags [{String}] list of set of tags with which to replace old set of tags
 * @param callback function to execute
 */
chartSchema.statics.editTags = function(chartId,userId,newTags,callback) {
  Charts.checkIfCanEdit(chartId,userId,function(err,canEdit){
    if (canEdit){
      Charts.findOneAndUpdate(
        {_id: chartId}, // NOTE LOWERCASE d
        {tags: newTags},
        {new: true},
        function(err,chart) {
          callback(err,chart);
        }
      )
    }//end if
    else{
      //the person doesn't have authorization to edit
      callback(err,canEdit); //this err is auth prob
    }
  });//end checkIfCanEdit
};


/**
 * Attempts to "delete" a chart. Not a true delete, but marks chart as deleted.
 * If a chart is not found whose ID matches the chartId and has the author userId, error.
 *
 * @param chartId {ObjectId} ID of chart in question
 * @param userId {ObjectId} ID of logged-in user
 * @param callback function to execute
 */
chartSchema.statics.deleteChart = function(chartId,userId,callback) {
  Charts.findOneAndUpdate(
    {_id: chartId, author: userId},
    {is_deleted: true},
    {new: true},
    function(err,chart) {
      callback(err,chart);
    }
  );
};


var Charts = mongoose.model("Charts", chartSchema);
module.exports = Charts; //keep at bottom of file
