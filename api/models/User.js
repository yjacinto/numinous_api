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
    /*trips:{
      collection: 'trip',
      via:'user'
    },*/

    friends: {
      collection: 'friend',
      via: 'user'
    },
    userProfile:{
      collection: 'userProfile',
      via: 'user'
    },
    /*
    travelGroups:{
      collection: 'travelCompanion',
      via: 'travelers'
    },*/

    trips:{
      collection: 'trip',
      via: 'travelers'
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
  },

  //get all nonfriends of user.
  getNonFriends: function(id, cb){
    Friend.find({
      or: [
        {user: id},
        {friend_id: id}
      ]
    }).exec(function(err, friends){
      console.log(friends);
      if(err){
        return cb(err);
      }
      if(friends.length > 0){
        //if friends found, find users who aren't friends
        var ids = [];
        friends.forEach(function (friend) {
          if(friend.user != id){
            ids.push(friend.user);
          }else{
            ids.push(friend.friend_id);
          }

        });
        console.log(ids);
        User.find({
          id: {'!': ids}
        }).exec(function (err, everyUserNonFriend) {
          if (err) {
            return cb(err);
          }
          cb(null, everyUserNonFriend);
        });
      } else {
        //if no friends, return all users in table
        User.find().exec(function(err,everyUser){
          if(err){
            return cb(err);
          }
          cb(null,everyUser);
        });
      }
    })
  },

  getFriends: function(id, cb){
    Friend.find({
      or: [
        {user: id},
        {friend_id: id}
      ]
    }).exec(function(err, friends){
      if(err){
        return cb(err);
      }
      var ids = [] ;
      friends.forEach(function(friend){
        if(friend.user != id){
          ids.push(friend.user);
        }else {
          ids.push(friend.friend_id);
        }

      });
      console.log('getFriends: ' + ids);
      User.find({
        id: ids
      }).exec(function(err,everyFriend){
        if(err){
          return cb(err);
        }
        cb(null,everyFriend);
      });
    })
  }
};

