var mongoose = require("mongoose");
var Charts = require('../model/chart_model.js');
var Users = require('../model/user_model.js');

var assert = require("assert");

var db = mongoose.connect('mongodb://localhost/testdb');

describe('Likes', function () {

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
          assert.isTrue(canComment);
          done();
        })
      })
    });
    it('should return false if user does not exist', function (done) {
      Comments.canComment(user._id, function (err, canComment) {
        assert.isFalse(canComment);
        done();
      })
    });
  });

  describe('makeComment', function () {
    it('should store a comment into database and return the new comment', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
        Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
          Comments.makeComment(user._id, madeChart._id, "hi mom!", function(err,canComment) {
            assert.isNull(err);
            done();
          })
        })
      })
    });

    it('should return an error and null comment if the user does not exist; does not store anything', function (done) {
      it('should store a comment into database and return the new comment', function (done) {
          Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
            Comments.makeComment(user._id, madeChart._id, "hi mom!", function (err, canComment) {
              assert.isNotNull(err);
              assert.isFalse(canComment);
              done();
            })
          })
      })
    });

    it('should return an error and null canComment if the chart does not exist; does not store anything', function (done) {
      Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
          Comments.makeComment(user._id, user._id, "hi mom!", function(err,canComment) {
            assert.isNotNull(err);
            done();
          })
      })
    });
  });

  describe('getChartComments', function () {
    it('should get a list of comments for a chart (possibly empty)', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
          Comments.makeComment(user._id, madeChart._id, "hi mom", function (err, canComment) {
            Comments.getChartComments(madeChart._id, function(err,comments) {
              assert.isEqual(comments.length,1);
              assert.isEqual(comments[0].text,"hi mom");
              done();
            })
          });
        })
      })
    });

    it('should return an empty list of comments for a non-existent chart', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Users.createUser('username', 'password', Date.now(), 'email@email.com', function (err, user) {
          Comments.makeComment(user._id, madeChart._id, "hi mom", function (err, canComment) {
            Comments.getChartComments(user._id, function(err,comments) {
              assert.isEqual(comments.length,0);
              done();
            })
          });
        })
      })
    });
  });

});