/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //returns all users in the database except for the user requesting
  getUsers: function(req,res){
    User.find({
      id: { '!': req.param('id') }
    }).exec(function (err, user) {

      if (err) {
        return res.serverError(res);
      }

      return res.json(user);
    });
  },

  //finds a single user by user_id
  getInfo: function(req,res){
    User.findOne({
      'id': req.param('id')
    }).exec(function(err,user){
      if(user == 'undefined'){
        return res.notFound();
      }
      if(err){
        return res.badRequest();
      }else{
        res.json({first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id
        })
      }
    })
  },

  //gets a user's trips
  getUserTrips: function(req,res){
    User.find({id: req.param('id')}).populate('trips')
      .exec(function (err, Trips){
        if(err){
          return res.badRequest(err);
        }
        return res.json(Trips);
      });
  },

  //getUsers who aren't friends with the requester.
  getNonFriends: function(req,res){
    console.log(req.param('id'));
    User.getNonFriends(req.param('id'), function(err, nonFriends){
        if(err){
          return res.badRequest(err);
        }
        return res.json(nonFriends);
      });
  },

  //getUsers who aren't friends with the requester.
  getFriends: function(req,res){
    User.getFriends(req.param('id'), function(err, friends){
      if(err){
        return res.badRequest(err);
      }
      return res.json(friends);
    });
  }

  /*getUserFriends: function(req,res){
    console.log('inside get user friends');
    console.log(req.param('id'));
    User.find({id: req.param('id')}).populate('friends')
      .exec(function (err, user){
        console.log(user);
        if(err){
          return res.badRequest(err);
        }

        function getFriends(friend){
          User.findOne({id: friend.friend_id}).exec(function(err,user))
        }
        console.log(user[0].friends);
        var friendArray = [];
        var promise = user[0].friends.forEach(function(friend){
          User.findOne({id: friend.friend_id}).then(function(err, found){
            console.log(found);
            friendArray.push(found);
          }).catch(function(err){
            console.log(err);
          });
        });
        Promise.all(promise).then(function(){
          console.log(friendArray);
          return res.json(friendArray);
        });
      });
  }*/
};

