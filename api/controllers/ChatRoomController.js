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
    console.log('inside adduser to chat');
    if (!req.isSocket) { return res.badRequest('req must be socket request'); }
    if (req.param('trip_id') == null) { return res.badRequest('Attach trip id'); }
    ChatRoom.findOne({
      trip: req.param('trip_id')
    }).populate('messages')
      .exec(function(err, chatroom){
        console.log(chatroom);
        ChatRoom.subscribe(req,chatroom.id);
        return res.send(chatroom.messages);
    });
  },

  sendMessage: function(req,res){
    if(!req.isSocket){return res.badRequest('req is not socket req');}
    if (req.param('trip_id') == null) { return res.badRequest('Attach trip id'); }
    Trip.findOne({
      id: req.param('trip_id')
    }).populate('chatroom')
      .exec(function(err, trip){
        console.log(trip);
        if(err){ res.badRequest('No trip found with given ID'); }

        Message.create({
          user: req.param('user'),
          timestamp: moment().format('YYYY-MM-DD HH:mm Z'),
          message: req.param('message'),
          chatroom: trip.chatroom[0].id
        }).exec(function(err, message){
          if(err){ return res.badRequest(err);}

          console.log('before publishAdd: ' + trip.chatroom[0].id);
          console.log(message);
          ChatRoom.message(message.chatroom, {
              user: message.user,
              id: message.id,
              timestamp: message.timestamp,
              message: message.message
          });
          return res.ok();
        })
      })
  }


};

