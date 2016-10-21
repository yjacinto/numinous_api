/**
 * Hotel.js
 *
 * @description :: TODO: Represents a hotel in which ppl stay for a number of nights.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type: 'string',
      required: true
    },

    numNights:{
      type: 'integer',
      required: true
    },

    address:{
      type: 'string',
      required: false
    },

    //may need to make type string to handle (per night, per guest, etc)
    expectedCost:{
      type: 'float',
      required: false
    },

    trip:{
      model: 'trip'
    }
  }
};

