/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * An event belongs to a single trip
 */

module.exports = {

  attributes: {
    name:{
      type: 'string'
    },

    startTime:{
      type: 'datetime'
    },

    endTime:{
      type: 'datetime'
    },

    location:{
      type: 'string'
    },

    expectedCost:{
      type: 'float'
    },

    trip:{
      model: 'trip'
    }
  }
};

