/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  addFriend: function(req,res) {
    Friend.create({
      user: req.param('id'),
      friend_id: req.param('friend_id')
    }).exec(function (err, friend) {
      if (err) {
        res.badRequest(err);
      }
      console.log('added friend ' + friend.toString());
      res.json(friend);
    });
  },

  isFriend: function(req,res){
    Friend.find({
      or:[
        {user: req.param('id'),
        friend_id: req.param('friend_id')},
        {user: req.param('friend_id'),
          friend_id: req.param('id')}
      ]
    }).exec(function (err, friend) {
      if (err) {
        res.badRequest(err);
      }
      res.json(friend);
    });
  },

  deleteFriend: function(req,res){
    Friend.destroy({
      or:[
        {user: req.param('id'),
          friend_id: req.param('friend_id')},
        {user: req.param('friend_id'),
          friend_id: req.param('id')}
      ]
    }).exec(function(err,deletedFriend){
      console.log(deletedFriend);
      if (err) {
        res.badRequest(err);
      }
      res.json(deletedFriend);
    });
  }

};

