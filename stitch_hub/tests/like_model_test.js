var mongoose = require("mongoose");
var Like = require('../model')
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
      Like.likeChart('chartId', 'userId', function (err, like) {
        // TODO: finish this
      });
    });

    it('should return an error and null like object if the user does not exist; does not store anything', function (done) {

    });

    it('should return an error and null like object if the chart does not exist; does not store anything', function (done) {

    });

    it('should return an error and null like object if a user has already liked the chart; does not store anything', function (done) {
      done();
    });
  });

  describe('getLike', function() {
    it('should return a like object', function (done) {
      done();
    });
  });

  describe('unLike', function() {
    it('should remove a like object from database and return the removed like', function (done) {
      done();
    });

    // This tet handles the case when the chart and user does not exist either
    it('should return an error and null like when the like does not exist', function (done) {
      done();
    });
  });

  describe('getNumLikes', function() {
    it('should get the number of likes for an existent chart (possibly 0)', function (done) {
      done();
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

    });
  });

  describe('canLike', function() {
    it('should ???', function (done) {
      done();
    });
  });

});