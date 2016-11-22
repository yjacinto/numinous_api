/**
 * TravelCompanion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //trip that the companions are associated with
    trip:{
      model: 'trip'
    },

    //collection of user ids to specify travel companions
    users:{
      collection: 'user',
      via: 'travelCompanion'
    }
  },

  /*
  //checks that new travel companion is a friend first.
  //returns error if not.
  beforeCreate: function(options, cb) {
    var id = options.user;
    var friend_id = options.friend_id;
    console.log('id: ' + id);
    console.log('friend_id: ' + friend_id);
    Friend.find({
      or: [
        {
          user: options.user,
          friend_id: options.friend_id
        },
        {
          user: options.friend_id,
          friend_id: options.user
        }
      ]
    }).exec(function (err, friend) {
      console.log(friend);
      if (err || friend.length == 0) {
        cb('Need to add user as a friend first!');
      }else {
        cb(null, true);
      }
    });
  }*/

};

