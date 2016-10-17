/**
 * Trip.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    originCity:{
      type: 'string',
      size: 128,
      required: true
    },
    destinationCity:{
      type: 'string',
      size: 128,
      required: true
    },
    startDate: {
      type: 'date',
      required: false
    },
    endDate: {
      type: 'date',
      required: false
    },
    //numNights
    //adminIDs

    events:{
      collection: 'event',
      via: 'trip'
    },

    hotels:{
      collection:'hotel',
      via:'trip'
    }
  }
};

