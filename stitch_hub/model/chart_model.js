var mongoose = require('mongoose');
//things we can easily validate with this package: https://www.npmjs.com/package/mongoose-validators
//can validate one or multiple things
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

var chartSchema = mongoose.Schema({
    title: {type:String, validate: validators.isLength(0,16)},
    description: {type:String, validate: validators.isLength(0,100)},
    date: { type: Date, default: Date.now,validate: validators.isDate() },
    type: {type:String, validate: validators.isIn(['KNIT_V', 'CROSS_STITCH','CROCHET_V','KNIT_H','CROCHET_H'])},
    rowSize: {type:Number},
    colSize: {type:Number},
    rows:[[{type:String, validate: validators.isHexColor()}]], //if things break look at this
    parent: {type:ObjectId, ref:"Chart"}
});


module.exports = mongoose.model("Chart", chartSchema); //keep at bottom of file