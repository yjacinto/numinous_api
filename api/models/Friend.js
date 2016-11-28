/**
 * Friends.js
 *
 * @description :: Represents a Friend of a particular user.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'user',
      via: 'friends'
    },

    friend_id: {
      type: 'integer'
    }
  },

  beforeCreate: function(options, cb) {
    var id = options.user;
    var friend_id = options.friend_id;
    Friend.find({
      or:[
        {user: options.user,
          friend_id: options.friend_id},
        {user: options.friend_id,
          friend_id: options.user}
      ]
    }).exec(function (err, friend) {
      //console.log(friend);
      if (err || friend.length > 0) {
        cb('Already a friend!');
      }
      cb(null, true);
    });





  }
};

