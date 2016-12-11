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

var validTypes = ["CROSS_STITCH", "KNIT_V", "KNIT_H", "CROCHET_V", "CROCHET_H"];

var chartSchema = mongoose.Schema({
    title: {type:String, validate: [validators.isLength(0,16)]},
    description: {type:String, validate: [validators.isLength(0,100)]},
    date: { type: Date, default: Date.now,validate: [validators.isDate()] },
    type: {type:String, enum: validTypes},
    rowSize: {type:Number, min:1, max:70},
    colSize: {type:Number, min:1, max:70},
    rows:[[{type:String, validate: validators.isHexColor()}]],
    parent: {type:ObjectId, ref:"Chart"},
    is_deleted: Boolean,
    nsfw: Boolean,
    tags: [String],
    comments: [{type:ObjectId, ref:"Comment"}],
    author: {type: ObjectId, ref:"User"}
});


/**
 * TODO
 * @param chartId
 * @param callback
 */
chartSchema.statics.getChartById = function (chartId, callback) {
  var that = this;
  Charts.findOne({_id: chartId}, function (err, chart) {
    if (err) {
      callback(err)
    } else {
      callback(null, chart)
    }
  })
};

/**
 * TODO
 * @param userId
 * @param callback
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
 * TODO
 * @param searchFor
 * @param filterSizeOn
 * @param filterTypeOn
 * @param tokens
 * @param callback
 */
chartSchema.statics.searchForChart = function (searchFor, filterSizeOn, filterTypeOn, tokens, callback) {
  searchRegex = tokens.map(function (token) {
    return new RegExp('\\b' + token + '\\b', 'i'); // consider as substring
  });
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

  // perform query
  Charts.aggregate([
    {$match: matchQuery},
    //instead of projecting, we could also just store the size in the chart when handling post
    {
      $project: {
        _id: "$_id",
        author: "$author",
        date: "$date",
        title: "$title",
        description: "$description",
        type: "$type",
        rowSize: "$rowSize",
        colSize: "$colSize",
        size: {$multiply: ["$rowSize", "$colSize"]},
        rows: "$rows",
        parent: "$parent",
        tags: "$tags",
        is_deleted: "$is_deleted"
      }
    },
    {$match: sizeFilter},
    {$sort: {'date': -1}}
  ], function(err,charts) {
    callback(err,charts);
  });
};

/**
 * TODO
 * @param author
 * @param title
 * @param description
 * @param type
 * @param rowSize
 * @param colSize
 * @param rows
 * @param parent
 * @param tags
 * @param callback
 */
chartSchema.statics.makeNewChart = function(author, title, description, type, rowSize, colSize, rows, parent, tags, callback) {
  console.log("attempting to make new chart");
  Charts.create({
    author: author, title: title, description: description, tags: tags,
    type: type, rowSize: rowSize, colSize: colSize, rows: rows, parent: parent, is_deleted: false
  }, function(err,chart) {
    callback(err,chart);
  })
};

/**
 * TODO
 * @param id
 * @param newDescription
 * @param callback
 */
chartSchema.statics.checkIfCanEdit = function(chartId,userId,callback){
  Charts.getChartById(chartId,function (err, charts) {
    var canEdit = false;
    if (err) {
      var chartAuthor = null;
      } //end if
    
    else {
      var chartAuthor = chart.author;
    } //end else

    if (userId == chartAuthor){
      canEdit = true;
    }
    
    callback(err,canEdit);

  });//end of Charts.getChartById
};//end of checkIfCanEdit

/**
 * TODO
 * @param id
 * @param newDescription
 * @param callback
 */
chartSchema.statics.editDescription = function(chartId,userId,newDescription,callback) {
  Charts.checkIfCanEdit(chartId,userId,function(err,canEdit){
    if (canEdit){
      Charts.findOneAndUpdate(
        {_id: chartId}, // NOTE LOWERCASE d
        {description: newDescription},
        function(err,chart){
          callback(err,chart); //this err is database prob
        }//end function
      )//end findoneandupdate
    }//end if

    else{
      //the person doesn't have authorization to edit
        callback(err,canEdit); //this err is auth prob
    }//end else

  });//end checkIfCanEdit

};//end of editDescription

/**
 * TODO
 * @param userId
 * @param newTags
 * @param callback
 */
chartSchema.statics.editTags = function(chartId,userId,newTags,callback) {
  Charts.checkIfCanEdit(chartId,userId,function(err,canEdit){
    if (canEdit){
      Charts.findOneAndUpdate(
        {_id: userId}, // NOTE LOWERCASE d
        {tags: newTags},
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
 * TODO
 * @param chartId
 * @param userId
 * @param callback
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
