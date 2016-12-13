var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../model/user_model.js');
var session = require('express-session');

/**
 * Handles POST request for logout. //TODO should have error handling!
 *
 * Responds with message--> loggedOut:true, success:"logged out!"
 */
router.post('/', function (req, res) {
  req.session.user = null;
  res.send({loggedOut: true, success:"logged out!"});
});

module.exports = router;