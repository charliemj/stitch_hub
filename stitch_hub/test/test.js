var fs = require("fs");

var mongoose = require("mongoose");
var Freets = require('../models/freet.js');
var Users = require('../models/user.js');

var assert = require("assert");

describe("App", function () {
  // The mongoose connection object.
  var con;

  // Before running any test, connect to the database.
  before(function (done) {
    con = mongoose.connect("mongodb://localhost/fritterdb", function () {
      done();
    });
  });

  // Delete the database before each test.
  beforeEach(function (done) {
    con.connection.db.dropDatabase(function () {
      done();
    });
  });

  describe("Users", function () {
    it("should have password, no following or freets", function (done) {
      Users.create({
        username: "val",
        password: "pw",
        following: [],
        freets: []
      })
    }, function (done) {
      Users.findOne({"name": "val"}, function (err, doc) {
        assert.strictEqual(doc.password, "pw");
        assert.strictEqual(doc.following.length, 0);
        assert.strictEqual(doc.freets.length, 0);
        done();
      });
    }); // end should have password, no following or freets

    it("should allow following, posting of freets", function (done) {
      Users.create({
        username: "val",
        password: "pw",
        following: [],
        freets: []
      }, function (err, doc) {
        doc.follow("390482943209",function() { return true; });
        doc.postFreet("hello world", function() { return true; });
        assert.strictEqual(doc.following.length, 1);
        assert.strictEqual(doc.freets.length, 1);
        assert.strictEqual(doc.following._id, "390482943209");
        done();
      });
    });
  }); // End describe User.

  describe("Freet", function () {
    it("should have freet text and author", function(done) {
      Freets.create({
        freet: "hello world",
        author: "4983u95843",
        _id: "123"
      }, function () {
        Freets.findOne({"_id": "123"}, function(err, doc) {
          console.log("DOC" + doc);
          assert.strictEqual(doc.freet, "hello world");
          assert.strictEqual(doc.author, "4983u95843");
          done();
        })
      })
    })
  }); // End describe Editable.
})
; // End describe App.

