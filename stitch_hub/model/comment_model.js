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

var commentSchema = mongoose.Schema({
  user: [{type: ObjectId, ref:"User"}],
  chart: {type:ObjectId, ref:"Chart"},
  text: String, //do we want to impose a length on this? if so, we can add a validator
});


module.exports = mongoose.model("Comment", commentSchema); //keep at bottom of file