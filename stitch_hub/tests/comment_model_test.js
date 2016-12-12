var mongoose = require("mongoose");
var Charts = require('../model/chart_model.js');
var Users = require('../model/user_model.js');
var Comments = require('../model/comment_model.js');

var assert = require("assert");

var db = mongoose.connect('mongodb://localhost/testdb');

describe('Comments', function () {

  after(function () {
    // disconnect for clean up
    db.disconnect();
  });

  // drop database before each test
  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('canComment', function () {
    it('should return true if user exists', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
        Comments.canComment(user._id, function (err, canComment) {
          assert.equal(canComment, true);
          done();
        })
      })
    });
    it('should return err if user does not exist', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Comments.canComment(madeChart._id, function (err, canComment) {
            assert.equal(canComment, false);
            done();
          })
        })
      })
    });
  });

  describe('makeComment', function () {
    it('should store a comment into database and return the new comment', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Comments.makeComment(user._id, madeChart._id, "hi mom!", function (err, canComment) {
            assert.ok(canComment);
            done();
          })
        })
      })
    });

    it('should store a comment into database and return the new comment', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Comments.makeComment(user._id, madeChart._id, "hi mom", function (err, comment) {
            assert.equal(comment.text, "hi mom");
            done();
          })
        })
      })
    });

    it('should return an error and canComment if the chart does not exist; does not store anything', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
        Users.createUser('username2', 'password', Date.now(), 'email@email.com', function (err, user2) {
          Comments.makeComment(user._id, user2._id, "hi mom!", function (err, canComment) {
            assert.equal(null,err);
            done();
          })
        })
      })
    });
  });

  describe('getChartComments', function () {
    it('should get a list of comments for a chart (possibly empty)', function (done) {
      Users.createUser('username2', 'password', Date.now(), 'email@email.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
            Comments.makeComment(user._id, madeChart._id, "hi mom", function (err, canComment) {
              Comments.getChartComments(madeChart._id, function (err, comments) {
                assert.equal(comments.length, 1);
                assert.equal(comments[0].text, "hi mom");
                done();
              })
            });
          })
        })
      })
    });

    it('should return an empty list of comments for a non-existent chart', function (done) {
      Users.createUser('username2', 'password', Date.now(), 'email@email.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
            Comments.makeComment(user._id, madeChart._id, "hi mom", function (err, canComment) {
              Comments.getChartComments(user._id, function (err, comments) {
                assert.equal(comments.length, 0);
                done();
              })
            });
          })
        })
      })
    });
  });

});