/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    first_name:{
      type: 'string',
      required: true,
      unique: false
    },
    last_name: {
      type: 'string',
      required: true,
      unique: false
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true
    },

    //associations
    trips:{
      collection: 'trip',
      via:'userTrips'
    },
    friends: {
      collection: 'friend',
      via: 'user'
    },
    userProfile:{
      collection: 'userProfile',
      via: 'user'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  //before creating, hash the user's password
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
  },

  //check to see if inputted password matches the password stored in the db
  comparePassword: function (passw, user, cb) {
  bcrypt.compare(passw, user.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
    });
  }
};

