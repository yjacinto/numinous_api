/**
 * ChatRoomController
 *
 * @description :: Server-side logic for managing Chatrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //add's a user's socket to the the chatroom.
  //request MUST be a socket!
	addUserToChat: function(req,res){
    if (!req.isSocket) { return res.badRequest('req must be socket request'); }
    ChatRoom.findOne({
      trip: req.param(trip_id)
    }).populate('messages')
      .exec(function(err, chatroom){
      //subscribe socket to specific chatroom.
      sails.sockets.join(req, chatroom, function(err) {
        if (err) { return res.serverError(err); }
        return res.json(chatroom.messages);
      });
    });
  },


  /*addUserToChat: function(req,res){
    if (req.isSocket) {
      // subscribe client to model changes
      ChatRoom.watch(req.socket);
      console.log('User subscribed to ' + req.socket.id);
    }
  },*/

  //creates a message given the trip_id
  /*sendMessage: function(req,res){
    Trip.findOne({
      id: req.param('trip_id')
    }).populate('chatroom')
      .exec(function(err, trip){
        console.log(trip);
        if(err){ res.badRequest('No trip found with given ID'); }
        Message.create({chatroom: trip.chatroom}).exec(function(err, message){
          if(err){ return badRequest(err);}
          return res.json({
            message: message
          });
        })
      })
  }*/

  sendMessage: function(req,res){
    if(!req.isSocket){return res.badRequest('req is not socket req');}
    Trip.findOne({
      id: req.param('trip_id')
    }).populate('chatroom')
      .exec(function(err, trip){
        console.log(trip);
        if(err){ res.badRequest('No trip found with given ID'); }
        Message.create({
          user: req.param('id'),
          timestamp: moment.now(),
          chatroom: trip.chatroom
        }).exec(function(err, message){
          if(err){ return badRequest(err);}
          ChatRoom.publishAdd(trip.chatroom.id, 'messages', {
              message:req.param('message')
          });
          return res.json({
            user : message.user,
            timestamp : message.timestamp,
            message: message
          });
        })
      })
  }


};

