var mongoose = require("mongoose");
var Charts = require('../model/chart_model.js');
var Users = require('../model/user_model.js');

var assert = require("assert");

var db = mongoose.connect('mongodb://localhost/testdb');

describe('Charts', function() {

  after(function() {
    // disconnect for clean up
    db.disconnect();
  });

  // drop database before each test
  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('makeNewChart', function() {
    it('should store a new chart and return it (with the correct values--see specification // TODO: write this specification)', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000','#000']['#000','#000']], 'parentId', ['tag'], function (err, chart) {
        // TODO: verify that the chart has the correct properties
      });
    });

    it('should do nothing and return an error and null chart when type is not one of: CROSS_STITCH, KNIT_V, KNIT_H, CROCHET_V, or CROCHET_H', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'WEIRD_TYPE', 1, 1, [['#000']], 'parentId', ['tag'], function (err, chart) {

      });
    });
    
    it('should do nothing and return an error and null chart when rowSize is not between 1 and 70, inclusive', function (done) {

    });

    it('should do nothing and return an error and null chart when colSize is not between 1 and 70, inclusive', function (done) {

    });

    it('should do nothing and return an error and null chart when rows does not match rowSize or colSize', function (done) {

    });

    it('should do nothing and return an error and null chart when tags is empty', function (done) {

    });

    it('should do nothing and return an error and null chart when user does not exist', function (done) {

    });
    // TODO: add length restrictions on the description and title
  });

  describe('getChartById', function() {
    it('should get the chart given by an ID', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Charts.getChartById(chart._id, function (err, foundChart) {
          // TODO: confirm that newChart and foundChart have the same values for everything
        });
      });
    });

    it('should return null chart when there is no chart with such an ID', function (done) {
      
    });
  });

  describe('getChartsByUser', function() {
    it('should return a list of all charts that the given user has made (possibly empty)', function (done) {

    });

    it('should return empty list when the user does not exist', function (done) {

    });
  });

  describe('searchForChart', function() {
    it('should search amongst all charts if tokens is empty', function (done) {

    })

    it('should correctly search for the properties in searchFor (without other options)', function (done) {

    });

    it('should correctly filter on size', function (done) {

    });

    it('should correctly filter on type', function (done) {

    });

    it('should return empty list when searchFor is empty', function (done) {

    });

    // TODO: change this test accordingly when the search functionality changes
  });

  describe('editDescription', function() {
    it('should edit a description and return the new description', function (done) {

    });

    it('should do nothing and return an error and null chart when chart does not exist', function (done) {

    });

    // TODO: can we test for when session user does not match with the chart author
  });

  describe('editTags', function() {
    it('should edit the tags and return the new list of tags', function (done) {

    });

    it('should do nothing and return an error and null chart when the chart does not exist', function (done) {

    });

    // TODO: can we test for when the session user does not match with the chart author
  });

  describe('deleteChart', function() {
    it('should remove a chart and return the deleted chart', function (done) {

    });

    it('should do nothing when no such chart exists, and return null chart (no error)', function (done) {

    });

    it('should remove all likes associated with the deleted chart', function (done) {

    });

    it('should remove all comments associated with the deleted chart', function (done) {

    });
  });

});