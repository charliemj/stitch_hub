var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var user = req.session.user;
  console.log("Current user is : " + user);
  res.send({user: user});
});

module.exports = router;