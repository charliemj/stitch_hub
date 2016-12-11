var mongoose = require('mongoose');
var crypto = require('crypto');

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

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  dob: {type: Date, validate: [validators.isDate()]},
  email: {type: String, validate: validators.isEmail()},
  following: [{type: ObjectId, ref: "User"}]
});

/**
 *
 * @param userId
 * @param callback
 */
userSchema.statics.getUserById = function (userId, callback) {
  Users.findOne({
    _id: userId
  }, function (err, user) {
    callback(err, user)
  })
};



/**
 * TODO
 * @param userId
 * @param callback
 */
userSchema.statics.isLoggedIn = function (userId,callback){
  var isLoggedIn = false;
  Users.getUserById(userId,function(err,user){
    if (user){
      isLoggedIn = true;
    }
    callback(err, isLoggedIn);
  });
};//end isLoggedIn

/**
 *
 * @param currentUser
 * @param userToFollow
 * @param callback
 */
userSchema.statics.followUser = function (currentUser, userToFollow, callback) {
  Users.isLoggedIn(userId, function(err,isLoggedIn){
    if (isLoggedIn){
      Users.findOneAndUpdate(
        {_id: userToFollow},
        {$addToSet: {following: currentUser}},
        function (err, user) {
          callback(err, user)
        })//end findone
    } //end if
    else{
      callback(err, isLoggedIn);
    }//end else
  });//end isLoggedIn
};

/**
 *
 * @param userId
 * @param callback
 */
userSchema.statics.getFollowersCharts = function (userId, callback) {
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
 *
 * @param username
 * @param password
 * @param dob
 * @param email
 * @param callback
 */
userSchema.statics.createUser = function(username, password, dob, email, callback) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  var hashedPassword = hash.digest('hex'); 
  Users.create({
    username: username,
    password: hashedPassword,
    dob: dob,
    email: email
  }, function(err, user) {
    callback(err,user)
  })
};


var Users = mongoose.model("Users", userSchema);
module.exports = Users; //keep at bottom of file