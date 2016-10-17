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
      type: 'string',
      size: 128,
      required: true
    },

    startTime:{
      type: 'datetime',
      required: true
    },

    endTime:{
      type: 'datetime',
      required: true
    },

    location:{
      type: 'string',
      required: false
    },

    expectedCost:{
      type: 'float',
      required: false
    },

    trip:{
      model: 'trip'
    }
  },

  beforeCreate: function(options, cb) {
    var eventStart = moment(options.startTime, "MM-DD-YYYY");
    var eventEnd = moment(options.endTime, "MM-DD-YYYY");
    var tripId = options.trip;
    Trip.findOne({
      id: tripId
    }).exec(function getTripTimes(err, trip) {
      if (err || trip === undefined) {
        return cb(new Error("error finding the trip with the given id"), null);
      }
      var startDateOfTrip = moment(trip.startDate, "MM-DD-YYYY");

      var endDateOfTrip = moment(trip.endDate, "MM-DD-YYYY");

      //return true if trip start <  event start < event end < trip end
      if ((eventStart > startDateOfTrip) && (eventStart < endDateOfTrip)
        && (eventEnd < endDateOfTrip) && (eventEnd > startDateOfTrip)
        && (eventEnd > eventStart)) {
        cb(null, true);
      } else {
        return cb(new Error("The event lies outside of the trip time"), null);
      }
    });
  }
};

