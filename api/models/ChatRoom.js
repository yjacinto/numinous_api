/**
 * ChatRoom.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //a chatroom associated with one trip
    trip:{
      model:'trip',
      unique: true
    },

    messages:{
      collection: 'message',
      via: 'chatroom'
    }
  }
};

