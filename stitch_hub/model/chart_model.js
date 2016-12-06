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
    rowSize: {type:Number},
    colSize: {type:Number},
    rows:[[{type:String, validate: validators.isHexColor()}]],
    parent: {type:ObjectId, ref:"Chart"},

    nsfw: Boolean,
    tags: [String],
    comments: [{type:ObjectId, ref:"Comment"}],
    author: {type: ObjectId, ref:"User"}

});


module.exports = mongoose.model("Chart", chartSchema); //keep at bottom of file