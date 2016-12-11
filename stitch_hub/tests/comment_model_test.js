var mongoose = require("mongoose");
var Charts = require('../model/chart_model.js');
var Users = require('../model/user_model.js');

var assert = require("assert");

var db = mongoose.connect('mongodb://localhost/testdb');

describe('Likes', function() {

  after(function() {
    // disconnect for clean up
    db.disconnect();
  });

  // drop database before each test
  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('makeComment', function() {
    it('should store a comment into database and return the new comment', function (done) {

    });

    it('should return an error and null comment if the user does not exist; does not store anything', function (done) {

    });

    it('should return an error and null comment if the chart does not exist; does not store anything', function (done) {

    });
  });

  describe('getChartComments', function() {
    it('should get a list of comments for a chart (possibly empty)', function (done) {

    });

    it('should return an empty list of comments for a non-existent chart', function (done) {

    });
  });

});