/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addFriend: function(req,res) {
    Friend.create({
      user: req.param('user'),
      friend_id: req.param('friend_id')
    }).exec(function (err, friend) {
      if (err) {
        res.badRequest(err);
      }
      res.json(friend);
    });
  },

  isFriend: function(req,res){
    Friend.find({
      or:[
        {user: req.param('user'),
        friend_id: req.param('friend_id')},
        {user: req.param('friend_id'),
          friend_id: req.param('user')}
      ]
    }).exec(function (err, friend) {
      if (err) {
        res.badRequest(err);
      }
      res.json(friend);
    });
  }
};

