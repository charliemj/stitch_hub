var mongoose = require("mongoose");
var Like = require('../model/like_model.js')
var Charts = require('../model/chart_model.js');
var Users = require('../model/user_model.js');

var assert = require("assert");

var db = mongoose.connect('mongodb://localhost/testdb');

describe('Likes', function() {

  after(function() {
    // disconnect for clean up
    db.disconnect();
  });

  // drop databse before each test
  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('likeChart', function() {
    it('should store a like and return the Like object', function (done) {
      Users.createUser('username', 'pass', Date.now(), 'email@email.com', function(err, user) {
        Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], null, ['tag'], false, function (err, chart) {
          Like.likeChart(chart._id, user._id, function (err, like) {
            assert.deepEqual(like.chart, chart._id);
            assert.deepEqual(like.user, user._id);
            done();
          });
        });
      });
    });
  });

  describe('getLike', function() {
    it('should return a like object', function (done) {
      Users.createUser('username', 'pass', Date.now(), 'email@email.com', function(err, user) {
        Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], null, ['tag'], false, function (err, chart) {
          Like.likeChart(chart._id, user._id, function (err, madeLike) {
            Like.getLike(chart._id, user._id, function (err, gotLike) {
              assert.deepEqual(madeLike._id, gotLike._id);
              done();
            });
          });
        });
      });
    });

    it('should return null for non-existent like (and no error)', function (done) {
      var chartId = mongoose.Types.ObjectId();
      var userId = mongoose.Types.ObjectId();
      Like.getLike(chartId, userId, function (err, like) {
        assert.ok(like == null);
        assert.ok(err == null);
        done();
      });
    });
  });

  describe('unLike', function() {
    it('should remove a like object from database and return the removed like', function (done) {
      Users.createUser('username', 'pass', Date.now(), 'email@email.com', function(err, user) {
        Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], null, ['tag'], false, function (err, chart) {
          Like.likeChart(chart._id, user._id, function (err, madeLike) {
            Like.unLike(chart._id, user._id, function (err, unLike) {
              Like.getLike(chart._id, user._id, function (err, like) {
                assert.ok(like == null);
                done();
              });
            });
          });
        });
      });
    });

    // This tet handles the case when the chart and user does not exist either
    it('should return an error and null like when the like does not exist', function (done) {
      var chartId = mongoose.Types.ObjectId();
      var userId = mongoose.Types.ObjectId();
      Like.unLike(chartId, userId, function (err, unLike) {
        assert.ok(unLike == null);
        done();
      });
    });
  });

  describe('getNumLikes', function() {
    it('should get the number of likes for an existent chart (possibly 0)', function (done) {
      Users.createUser('username', 'pass', Date.now(), 'email@email.com', function(err, user1) {
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], null, ['tag'], false, function (err, chart) {
          Users.createUser('username2', 'pass', Date.now(), 'email@gmail.com', function(err, user2) {
            Users.createUser('username3', 'pass', Date.now(), 'da@gmail.com', function(err, user3) {
              Like.likeChart(chart._id, user1._id, function (err, madeLike1) {
                Like.likeChart(chart._id, user2._id, function (err, madeLike2) {
                  Like.likeChart(chart._id, user3._id, function (err, madeLike3) {
                    Like.getNumLikes(chart._id, function (err, numLikes) {
                      assert.equal(numLikes, 3);
                      done();
                    })
                  });
                })
              });
            });
          });
        });
      });
    });

    it('should return 0 (and no error) if the chart does not exist', function (done) {
      done();
    });


  });

  describe('getLikedCharts', function() {
    it('should return a list of charts liked by a given user (possibly empty)', function (done) {
      done();
    });

    it('should return an empty list when the user does not exist', function (done) {
      done();
    });
  });

  describe('canLike', function() {
    it('should ???', function (done) {
      done();
    });
  });

});