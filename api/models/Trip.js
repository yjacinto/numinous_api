/**
 * Trip.js
 *
 * @description :: Trip resents the trip from one destination to another.
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
      type: 'datetime',
      required: false
    },

    endDate: {
      type: 'datetime',
      required: false
    },

    events:{
      collection: 'event',
      via: 'trip'
    },

    hotels:{
      collection:'hotel',
      via:'trip'
    },

    //user who created this trip
    /*user:{
      model: 'user'
    },*/

    /*travelCompanions:{
      model:'TravelCompanion',
      unique: true
    }*/

    travelers:{
      collection: 'user',
      via: 'trips'
    }

  },

    beforeCreate: function(options, cb){
      //first check whether the end time is after the start time.
      TimeValidationService.startEndTimeValidate({
        start: options.startDate,
        end: options.endDate},
        function(err) {
          if (err) {
            return cb(err, false);
          }
        return cb(null, true);
      })
    }

};

