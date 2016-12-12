var mongoose = require("mongoose");
var Charts = require('../model/chart_model.js');
var Users = require('../model/user_model.js');

var assert = require("assert");

var db = mongoose.connect('mongodb://localhost/testdb');

var createRowsWithSize = function (rowSize, colSize) {
  var rows = [];
  for (var i = 0; i < rowSize; i++) {
    var row = [];
    for (var j = 0; j < colSize; j++) {
      row.push('#000');
    }
    rows.push(row);
  }
  return rows;
};

var containsChartWithId = function (charts, chartId) {
  for (var i = 0; i < charts.length; i++) {
    var chart = charts[i];
    if (String(chart._id) == String(chartId)) {
      return true;
    }
  }
  return false;
};

describe('Charts', function () {

  after(function () {
    // disconnect for clean up
    db.disconnect();
  });

  // drop database before each test
  beforeEach(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  describe('makeNewChart', function () {
    it('should store a new chart and return it (with the correct values--see specification)', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000', '#000'], ['#000', '#000']], parentId, ['tag'], false, function (err, chart) {
            assert.equal(chart.title, 'title');
            assert.equal(chart.description, 'description');
            assert.equal(chart.type, 'CROSS_STITCH');
            assert.equal(chart.size, 4);
            assert.equal(chart.rows[0].length, 2);
            assert.equal(chart.parent, parentId);
            assert.equal(chart.is_deleted, false);
            assert.equal(chart.nsfw, false);
            assert.equal(chart.tags.length, 1);
            assert.equal(chart.author, user1._id);
            done();
          }
        );
      })
    });

    it('should do nothing and return an error and null chart when type is not one of: CROSS_STITCH, KNIT_V, KNIT_H, CROCHET_V, or CROCHET_H', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'WEIRD_TYPE', 1, 1, [['#000']], parentId, ['tag'], false, function (err, chart) {
          Charts.getChartsByUser(user1._id, function (err, foundCharts) {
            //assert.equal(err,null);
            assert.equal(chart, null);
            done();
          })
        });
      })
    });

    it('should do nothing and return an error and null chart when rowSize is not between 1 and 70, inclusive', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 0, 2, [], parentId, ['tag'], false, function (err, chart) {
          assert(err);
          assert.equal(chart, null);
        })
      });
      Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 80, 2, [
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'],
          ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000'], ['#000', '#000']], parentId, ['tag'], false, function (err, chart) {
          assert(err);
          assert.equal(chart, null);
        })
      })
      done();
    });

    it('should do nothing and return an error and null chart when colSize is not between 1 and 70, inclusive', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 2, 80, [
          ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'],
          ['#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000',
            '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000']
        ], parentId, ['tag'], false, function (err, chart) {
          assert(err);
          assert.equal(chart, null);
        });
      });
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 2, 0, [], parentId, ['tag'], false, function (err, chart) {
          assert(err);
          assert.equal(chart, null);
        })
      });
      done();
    });

    it('should do nothing and return an error and null chart when rows does not match rowSize or colSize', function (done) {
      //testing for colSize
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 2, 3, [['#000', '#000'], ['#000', '#000']], parentId, ['tag'], false, function (err, chart) {
          assert(err);
          assert.equal(chart, null);
        })
      });
      //testing for rowSize
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 3, 2, [['#000', '#000'], ['#000', '#000']], parentId, ['tag'], false, function (err, chart) {
          assert(err);
          assert.equal(chart, null);

        })
      });
      done();
    });

    it('should do nothing and return an error and null chart when tags is empty', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000', '#000'], ['#000', '#000']], parentId, [], false, function (err, chart) {
          assert.equal(chart, null);
          done();
        })
      })
    });

    it('should do nothing and return an error and null chart when user does not exist', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart('yourmom', 'title', 'description', 'CROSS_STITCH', 2, 2, [['#000', '#000'], ['#000', '#000']], parentId, ['tag'], false, function (err, chart) {
          assert(err);
          assert.equal(chart, null);
          done();
        })
      })
    });
  });

  describe('getChartById', function () {
    it('should get the chart given by an ID', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, chart) {
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
    });

    it('should return null chart when there is no chart with such an ID', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Charts.getChartById('8675309', function (err, foundChart) {
            assert(err);
            assert.isNull(chart);
            done();
          })
        })
      })
    });
  });

  describe('getChartsByUser', function () {
    it('should return a list of all charts that the given user has made (possibly empty)', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Charts.getChartsByUser(madeChart.author, function (err, foundCharts) {
            assert(err == null);
            assert.equal(foundCharts.length, 1);
            assert.equal(foundCharts[0].title, "title");
            done();
          })
        })
      })
    });

    it('should return empty list when the user does not exist', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Charts.getChartsByUser("8493280", function (err, foundCharts) {
            assert.equal(foundCharts.length, 0);
            done();
          })
        })
      })
    });
  });

  describe('searchForChart', function () { // TODO: change this test accordingly when the search functionality changes

    it('should search amongst all charts if tokens is empty', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
          var parentId1 = mongoose.Types.ObjectId();
          var parentId2 = mongoose.Types.ObjectId();
          var parentId3 = mongoose.Types.ObjectId();
          Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId1, ['tag'], false, function (err, madeChart) {
            Charts.makeNewChart(user2._id, 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], parentId2, ['tag'], false, function (err, madeChart2) {
              Charts.makeNewChart(user2._id, 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], parentId3, ['tag'], false, function (err, madeChart3) {
                Charts.searchForChart([], [], [], [], madeChart.author, function (err, charts) {
                  assert.equal(charts.length, 3);
                  done();
                })
              })
            })
          })
        })
      })
    });

    it('should correctly search for the properties in searchFor (without other options)', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
          var parentId1 = mongoose.Types.ObjectId();
          var parentId2 = mongoose.Types.ObjectId();
          var parentId3 = mongoose.Types.ObjectId();
          Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId1, ['tag'], false, function (err, madeChart) {
            Charts.makeNewChart(user2._id, 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], parentId2, ['tag2'], false, function (err, madeChart2) {
              Charts.makeNewChart(user2._id, 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], parentId3, ['tag3'], false, function (err, madeChart3) {
                Charts.searchForChart(["tags"], [], [], [], madeChart.author, function (err, charts) {
                  assert.equal(charts.length, 3);
                  done();
                })
              })
            })
          })
        })
      })
    });

    describe('should correctly filter', function () {
      var chartRowSize1 = 4;
      var chartColSize1 = 4;
      var chartRowSize2 = 25;
      var chartColSize2 = 25;
      var chartRowSize3 = 50;
      var chartColSize3 = 50;
      var chartRowSize4 = 1;
      var chartColSize4 = 2;

      it('should work correctly on small size', function (done) {
        Users.createUser('author', 'password', Date.now(), 'email@email.com', function (err, user) {
          Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize1, chartColSize1, createRowsWithSize(chartRowSize1, chartColSize1), null, ['tag'], false, function (err, chart1) {
            Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize2, chartColSize2, createRowsWithSize(chartRowSize2, chartColSize2), null, ['tag'], false, function (err, chart2) {
              Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize3, chartColSize3, createRowsWithSize(chartRowSize3, chartColSize3), null, ['tag'], false, function (err, chart3) {
                Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize4, chartColSize4, createRowsWithSize(chartRowSize4, chartColSize4), null, ['tag'], false, function (err, chart4) {
                  Charts.searchForChart([], ['small'], [], [], user._id, function (err, charts) {
                    console.log(JSON.stringify(charts));
                    console.log(chart1._id);
                    assert.ok(containsChartWithId(charts, chart1._id));
                    assert.ok(!containsChartWithId(charts, chart2._id));
                    assert.ok(!containsChartWithId(charts, chart3._id));
                    assert.ok(containsChartWithId(charts, chart4._id));
                    done();
                  });
                });
              });
            });
          });
        });
      });

      it('should work correctly on medium size', function (done) {
        Users.createUser('author', 'password', Date.now(), 'email@email.com', function (err, user) {
          Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize1, chartColSize1, createRowsWithSize(chartRowSize1, chartColSize1), null, ['tag'], false, function (err, chart1) {
            Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize2, chartColSize2, createRowsWithSize(chartRowSize2, chartColSize2), null, ['tag'], false, function (err, chart2) {
              Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize3, chartColSize3, createRowsWithSize(chartRowSize3, chartColSize3), null, ['tag'], false, function (err, chart3) {
                Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize4, chartColSize4, createRowsWithSize(chartRowSize4, chartColSize4), null, ['tag'], false, function (err, chart4) {
                  Charts.searchForChart([], ['medium'], [], [], user._id, function (err, charts) {
                    assert.ok(!containsChartWithId(charts, chart1._id));
                    assert.ok(containsChartWithId(charts, chart2._id));
                    assert.ok(!containsChartWithId(charts, chart3._id));
                    assert.ok(!containsChartWithId(charts, chart4._id));
                    done();
                  });
                });
              });
            });
          });
        });
      });

      it('should work correctly on large size', function (done) {
        Users.createUser('author', 'password', Date.now(), 'email@email.com', function (err, user) {
          Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize1, chartColSize1, createRowsWithSize(chartRowSize1, chartColSize1), null, ['tag'], false, function (err, chart1) {
            Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize2, chartColSize2, createRowsWithSize(chartRowSize2, chartColSize2), null, ['tag'], false, function (err, chart2) {
              Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize3, chartColSize3, createRowsWithSize(chartRowSize3, chartColSize3), null, ['tag'], false, function (err, chart3) {
                Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize4, chartColSize4, createRowsWithSize(chartRowSize4, chartColSize4), null, ['tag'], false, function (err, chart4) {
                  Charts.searchForChart([], ['large'], [], [], user._id, function (err, charts) {
                    assert.ok(!containsChartWithId(charts, chart1._id));
                    assert.ok(!containsChartWithId(charts, chart2._id));
                    assert.ok(containsChartWithId(charts, chart3._id));
                    assert.ok(!containsChartWithId(charts, chart4._id));
                    done();
                  });
                });
              });
            });
          });
        });
      });

      it('should work correctly on a combination', function (done) {
        Users.createUser('author', 'password', Date.now(), 'email@email.com', function (err, user) {
          Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize1, chartColSize1, createRowsWithSize(chartRowSize1, chartColSize1), null, ['tag'], false, function (err, chart1) {
            Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize2, chartColSize2, createRowsWithSize(chartRowSize2, chartColSize2), null, ['tag'], false, function (err, chart2) {
              Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize3, chartColSize3, createRowsWithSize(chartRowSize3, chartColSize3), null, ['tag'], false, function (err, chart3) {
                Charts.makeNewChart(user._id, 'title', 'description', 'CROSS_STITCH', chartRowSize4, chartColSize4, createRowsWithSize(chartRowSize4, chartColSize4), null, ['tag'], false, function (err, chart4) {
                  Charts.searchForChart([], ['small', 'medium'], [], [], user._id, function (err, charts) {
                    assert.ok(containsChartWithId(charts, chart1._id));
                    assert.ok(containsChartWithId(charts, chart2._id));
                    assert.ok(!containsChartWithId(charts, chart3._id));
                    assert.ok(containsChartWithId(charts, chart4._id));
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });

    it('should correctly filter on type', function (done) {
      done();
    });
  });

  describe('editDescription', function () {
    it('should edit a description and return the new description', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Charts.editDescription(madeChart._id, madeChart.author, "farts", function (err, chart) {
            assert.equals(chart.description, "farts");
            done();
          })
        })
      })
    });

    it('should do nothing and return an error and null chart when chart does not exist', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag'], false, function (err, madeChart) {
          Charts.editDescription(madeChart.author, madeChart.author, "farts", function (err, chart) {
            assert(err);
            assert.isNull(chart);
            done();
          })
        })
      })
    });
  });

  describe('editTags', function () {
    it('should edit the tags and return the new list of tags', function (done) {
      Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag', 'tagoo', 'tagapalooza'], false, function (err, madeChart) {
          Charts.editTags(madeChart._id, madeChart.author, ['nope'], function (err, chart) {
            assert(!err);
            assert.equal(chart.tags.length, 1);
            assert.equal(madeChart.tags.length, 3);
            done();
          })
        })
      })
    });

    it('should do nothing and return an error and null chart when the chart does not exist', function (done) {
      it('should edit the tags and return the new list of tags', function (done) {
        Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
          var parentId = mongoose.Types.ObjectId();
          Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag', 'tagoo', 'tagapalooza'], false, function (err, madeChart) {
            Charts.editTags(madeChart.author, madeChart.author, ['nope'], function (err, chart) {
              assert(err);
              assert.isNull(chart);
              assert.equal(madeChart.tags.length, 3);
              done();
            })
          })
        })
      })
    });
  });

  describe('deleteChart', function () {
    it('should remove a chart and return the deleted chart', function (done) {
      Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag', 'tagoo', 'tagapalooza'], false, function (err, madeChart) {
          Charts.deleteChart(madeChart._id, madeChart.author, function (err, chart) {
            assert.equal(chart.is_deleted, true);
            done();
          });
        })
      })
    });

    it('should do return err and null when chart does not exist', function (done) {
      Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag', 'tagoo', 'tagapalooza'], false, function (err, madeChart) {
          Charts.deleteChart(madeChart.author, madeChart.author, function (chart) {
            assert(err);
            assert.isNull(chart);
            done();
          });
        })
      })
    });
  });

  describe('checkIfCanEdit', function () {
    it('should be able to edit chart I authored', function (done) {
      Users.createUser('username2', 'password', Date.now(), 'email@email1.com', function (err, user2) {
        var parentId = mongoose.Types.ObjectId();
        Charts.makeNewChart(user2._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId, ['tag', 'tagoo', 'tagapalooza'], false, function (err, madeChart) {
          Charts.checkIfICanEdit(madeChart._id, madeChart.author, function (err, canEdit) {
            assert.isTrue(canEdit);
            done();
          })
        })
      })
    });
    it('should not be able to edit chart I havent authored', function (done) {
      Users.createUser('username1', 'password', Date.now(), 'email@email1.com', function (err, user1) {
        Users.createUser('username2', 'password', Date.now(), 'email2@email1.com', function (err, user2) {
          var parentId1 = mongoose.Types.ObjectId();
          var parentId2 = mongoose.Types.ObjectId();
          Charts.makeNewChart(user1._id, 'title', 'description', 'CROSS_STITCH', 1, 1, [['#000']], parentId1, ['tag', 'tagoo', 'tagapalooza'], false, function (err, madeChart) {
            Charts.makeNewChart(user2._id, 'title2', 'description2', 'CROSS_STITCH', 1, 1, [['#000']], parentId2, ['tag', 'tagoo', 'tagapalooza'], false, function (err, madeChart2) {
              Charts.checkIfICanEdit(madeChart2._id, madeChart.author, function (err, canEdit) {
                assert.isFalse(canEdit);
                done();
              })
            })
          })
        })
      })
    });
  });
});