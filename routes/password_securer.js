var crypto = require('crypto');

// Code modified from:
// https://gist.github.com/soplakanets/980737
//
// PasswordSecurer provides helper methods for creating a password hash (using salting and hashing)
// as well as verifying hashes.
var PasswordSecurer = function() {
  var that = Object.create(PasswordSecurer.prototype);

  var SALT_LENGTH = 9;

  var md5 = function(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }

  that.generateSalt = function(len) {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
        setLen = set.length,
        salt = '';
    for (var i = 0; i < len; i++) {
      var p = Math.floor(Math.random() * setLen);
      salt += set[p];
    }
    return salt;
  }

  that.createHash = function(salt, password) {
    return md5(password + salt);
  };

  that.validateHash = function(hash, salt, password) {
    return md5(password + salt) === hash;
  }

  Object.freeze(that);

  return that;
};

module.exports = PasswordSecurer;