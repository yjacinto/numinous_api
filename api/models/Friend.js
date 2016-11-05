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
    },
  }
};

