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
    },

    user:{
      model: 'user'
    },

    travelCompanions:{
      collection: 'travelCompanion',
      via: 'trip'
    }

    //travelCompanions
  },

    beforeCreate: function(options, cb){
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

