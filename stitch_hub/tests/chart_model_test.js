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
    it('should store a new chart and return it (with the correct values--see specification)', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000','#000'],['#000','#000']], 'parentId', ['tag'], function (err, chart) {
        Charts.getChartByUser('username',function(err,foundChart) {
          assert.ok(foundChart != null);
          assert.deepEqual(chart._id, foundChart._id);
          assert.equal(chart.author, foundChart.author);
          assert.equal(chart.title, foundChart.title);
          assert.equal(chart.description, foundChart.description);
          assert.equal(chart.type, foundChart.type);
          assert.equal(chart.size, foundChart.size);
          assert.equal(chart.rows, foundChart.rows);
          assert.equal(chart.parent, foundChart.parent);
          assert.equal(chart.is_deleted, foundChart.is_deleted);
          assert.equal(chart.nsfw, foundChart.nsfw);
          assert.equal(chart.tags, foundChart.tags);
          assert.equal(chart.comments, foundChart.comments);
          assert.equal(chart.author, foundChart.author);
          done();
        })
      }
      );
    });

    it('should do nothing and return an error and null chart when type is not one of: CROSS_STITCH, KNIT_V, KNIT_H, CROCHET_V, or CROCHET_H', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'WEIRD_TYPE', 1, 1, [['#000']], 'parentId', ['tag'], function (err, chart) {
        Charts.getChartByUser('username',function(err,foundChart) {
          assert(err);
          assert.equal(foundChart, null);
          done();
        })
      });
    });
    
    it('should do nothing and return an error and null chart when rowSize is not between 1 and 70, inclusive', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 0, 2, [], 'parentId', ['tag'], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      });
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 70, 2, [
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],
        ['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000'],['#000','#000']], 'parentId', ['tag'], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      })
    });

    it('should do nothing and return an error and null chart when colSize is not between 1 and 70, inclusive', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 2, 70, [
        ['#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000'],
        ['#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000',
         '#000','#000','#000','#000','#000','#000','#000','#000','#000','#000']
      ], 'parentId', ['tag'], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      });
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 2, 0, [], 'parentId', ['tag'], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      })
    });

    it('should do nothing and return an error and null chart when rows does not match rowSize or colSize', function (done) {
      //testing for colSize
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 2, 3, [['#000','#000'],['#000','#000']], 'parentId', ['tag'], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      });
      //testing for rowSize
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 3, 2, [['#000','#000'],['#000','#000']], 'parentId', ['tag'], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      });
    });

    it('should do nothing and return an error and null chart when tags is empty', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000','#000'],['#000','#000']], 'parentId', [], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      })
    });

    it('should do nothing and return an error and null chart when user does not exist', function (done) {
      Charts.makeNewChart('yourmom', 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000','#000'],['#000','#000']], 'parentId', ['tag'], function(err,chart) {
        assert(err);
        assert.equal(chart, null);
        done();
      })
    });
  });

  describe('getChartById', function() {
    it('should get the chart given by an ID', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Charts.getChartById(chart._id, function (err, foundChart) {
          assert.ok(foundChart != null);
          assert.deepEqual(chart._id, foundChart._id);
          assert.equal(chart.author, foundChart.author);
          assert.equal(chart.title, foundChart.title);
          assert.equal(chart.description, foundChart.description);
          assert.equal(chart.type, foundChart.type);
          assert.equal(chart.size, foundChart.size);
          assert.equal(chart.rows, foundChart.rows);
          assert.equal(chart.parent, foundChart.parent);
          assert.equal(chart.is_deleted, foundChart.is_deleted);
          assert.equal(chart.nsfw, foundChart.nsfw);
          assert.equal(chart.tags, foundChart.tags);
          assert.equal(chart.comments, foundChart.comments);
          assert.equal(chart.author, foundChart.author);
          done();
        });
      });
    });

    it('should return null chart when there is no chart with such an ID', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Charts.getChartById('8675309', function (err, foundChart) {
          assert(err);
          assert.equal(madeChart, null);
          done();
        })
      })
    });
  });

  describe('getChartsByUser', function() {
    it('should return a list of all charts that the given user has made (possibly empty)', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Charts.getChartsByUser(madeChart.author, function(err,foundCharts) {
          assert(err==null);
          assert.equal(foundCharts.length, 1);
          assert.equal(foundCharts[0].title, "title");
          done();
        })
      })
    });

    it('should return empty list when the user does not exist', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Charts.getChartsByUser("8493280", function(err,foundCharts) {
          assert.equal(foundCharts.length, 0);
          done();
        })
      })
    });
  });

  describe('searchForChart', function() {
    it('should search amongst all charts if tokens is empty', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Charts.makeNewChart('username2', 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart2) {
          Charts.makeNewChart('username2', 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart3) {
            Charts.searchForChart([], [], [], [], madeChart.author, function (err,charts) {
              assert.equal(charts.length,3);
            })
          })
        })
      })
    });

    it('should correctly search for the properties in searchFor (without other options)', function (done) {
      Charts.makeNewChart('username', 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag'], function (err, madeChart) {
        Charts.makeNewChart('username2', 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag2'], function (err, madeChart2) {
          Charts.makeNewChart('username2', 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], 'parentId', ['tag3'], function (err, madeChart3) {
            Charts.searchForChart(["tags"], [], [], [], madeChart.author, function (err,charts) {
              assert.equal(charts.length,3);
            })
          })
        })
      })
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