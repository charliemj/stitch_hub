var mongoose = require('mongoose');
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
 * Given an ID, get a specific user.
 *
 * @param userId {ObjectId} ID of user in question
 * @param callback function to execute
 */
userSchema.statics.getUserById = function (userId, callback) {
  Users.findOne({
    _id: userId
  }, function (err, user) {
    callback(err, user)
  })
};

/**
 * Make one specified user follow another specified user.
 *
 * @param currentUser {ObjectId} ID of user
 * @param userToFollow {ObjectId} ID of user to follow
 * @param callback function to execute
 */
userSchema.statics.followUser = function (currentUser, userToFollow, callback) {
  Users.findOneAndUpdate(
    {_id: userToFollow},
    {$addToSet: {following: currentUser}},
    function (err, user) {
      callback(err, user)
    })
};

/**
 * Get all charts authored by a user's followers.
 *
 * @param userId {ObjectId} ID of
 * @param callback function to execute
 */
userSchema.statics.getFollowersCharts = function (userId, callback) {
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
};

/**
 * Create a new User.
 *
 * @param username {String} username of user
 * @param password {String} hashed password of user
 * @param dob {Date} user's birthday
 * @param email {String} user's email address
 * @param callback function to execute
 */
userSchema.statics.createUser = function(username, password, dob, email, callback) {
  Users.create({
    username: username,
    password: password,
    dob: dob,
    email: email
  }, function(err, user) {
    callback(err,user)
  })
};


var Users = mongoose.model("Users", userSchema);
module.exports = Users; //keep at bottom of file