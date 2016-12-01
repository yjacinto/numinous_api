/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    message:{
      type: 'string'
    },

    user:{
      type: 'string'
    },

    timestamp:{
      type: 'datetime'
    },

    //one to many relationship with ChatRoom
    chatroom:{
      model:'chatroom'
      //via: 'messages'
    }
  }
};

