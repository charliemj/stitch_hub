var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

router.get('/', function(req, res) {
  res.render('index', { message: req.flash('message') });
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash : true
}));