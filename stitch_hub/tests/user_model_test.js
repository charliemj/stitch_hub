var mongoose = require("mongoose");
var Users = require('../model/user_model.js');
var Charts = require('../model/chart_model.js');

var assert = require("assert");

var db = mongoose.connect('mongodb://localhost/testdb');

describe('Users', function() {

  after(function() {
    // disconnect for clean up
    db.disconnect();
  });

  // drop databse before each test
  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('createUser', function() {
    it('should create a user and return the user created', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
        Users.getUserById(user._id, function (err, foundUser) {
          assert.ok(foundUser != null);
          assert.deepEqual(user._id, foundUser._id);
          assert.equal(user.username, foundUser.username);
          assert.equal(user.password, foundUser.password);
          assert.deepEqual(user.dob, foundUser.dob);
          assert.equal(user.email, foundUser.email);
          done();
        });
      });
    });

    it('should return an error and null user when email is not in email format', function (done) {
      Users.createUser('username', 'password', Date.now(), 'notemailformat', function (err, user) {
        assert.ok(user == null);
        assert.ok(err != null);
        done();
      });
    });
  });

  describe('getUserById', function() {
    it('should get the user given an id', function (done) {
      // already tested in createUser test
      done();
    });

    it('should return null user but no error when an id does not correspond to a user', function (done) {
      Users.getUserById('userId', function (err, user) {
        assert.ok(user == null);
        assert.ok(err != null);
        done();
      });
    });
  });

  describe('followUser', function() {
    it('should follow the user', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        Users.createUser('username2', 'password', Date.now(), 'email@gmail2.com', function (err, user2) {
          Users.followUser(user1, user2, function (err, userFollowing) {
            assert.deepEqual(userFollowing._id, user1._id); // user1 is the user following
            assert.ok(userFollowing.following.indexOf(user2._id) != -1); // check 
            done();
          })
        });
      });
    });
  });

  describe('getFollowersCharts', function() {
    it('should return list of charts of by users that a given user follows', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        Users.createUser('username2', 'password', Date.now(), 'email@gmail2.com', function (err, user2) {
          Users.followUser(user1._id, user2._id, function (err, userFollowing){
            Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000','#000'],['#000','#000']], null, ['tag'], false, function (err, chart) {
              Charts.getFollowersCharts(user1._id, function(err,charts) {
                assert.equal(charts.length, 1);
                done();
              })
            })
          });
        });
      });
    });

    it('should return charts=false when given a non-existing user', function (done) {
      Charts.getFollowersCharts('userId', function (err, charts) {
        assert.equal(charts, false);
        done();
      });
    });
  });

});