/**
 * Event.js
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 *  Event represents the event in which ppl go on the trip.
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

  //validates that the event lies within the trip date range
  //validates that the event end time is after start time
  //fires before the event is created
  beforeCreate: function validateEvent(options, cb) {
    console.log(options);
    var eventStart = moment(options.startTime, "MM-DD-YYYY");
    var eventEnd = moment(options.endTime, "MM-DD-YYYY");
    var tripId = options.trip;
    Trip.find({
      id: tripId
    }).exec(function getTripTimes(err, trip) {
      if (err || trip === undefined) {
        console.log(trip);
        return cb(new Error("error finding the trip with the given id"), null);
      }

      var startDateOfTrip = moment(trip.startDate, "YYYY-MM-DD");
      var endDateOfTrip = moment(trip.endDate, "YYYY-MM-DD");

      //return true if trip start <  event start < event end < trip end
      if ((eventStart > startDateOfTrip) && (eventStart < endDateOfTrip)
        && (eventEnd < endDateOfTrip) && (eventEnd > startDateOfTrip)
        && (eventEnd > eventStart)) {
        cb(null, true);
      } else {
        return cb(new Error("The event lies outside of the trip time or the" +
          "event start is after the event end time"), null);
      }
    });
  }
};

