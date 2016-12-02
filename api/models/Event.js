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

    //Add Event
    place_id:{
      type: 'string',
      required: false
    },

    allDay: {
      type: 'bit',
      required: false,
      defaultsTo: false
    },

    trip:{
      model: 'trip'
    }
  },

  //validates that the event lies within the trip date range
  //validates that the event end time is after start time
  //fires before the event is created
  beforeCreate: function validateEvent(options, cb) {
    var eventStart = options.startTime;
    var eventEnd = options.endTime;
    var tripId = options.trip;
    console.log("tripid =" + tripId);

    Trip.findOne({
      id: tripId
    }).exec(function getTripTimes(err, trip) {
      console.log("after query");
      console.log(trip);
      if (err || trip === undefined) {
        return cb(new Error("error finding the trip with the given id"), null);
      }
      var startDateOfTrip = trip.startDate;
      var endDateOfTrip = trip.endDate;
      console.log("event start " + eventStart);
      console.log("event end " + eventEnd);
      console.log("tip start " + startDateOfTrip);
      console.log("trip end " + endDateOfTrip);
      //return true if trip start <  event start < event end < trip end
      if ((eventStart > startDateOfTrip) && (eventStart < endDateOfTrip)
        && (eventEnd < endDateOfTrip) && (eventEnd > startDateOfTrip)
        && (eventEnd > eventStart)) {
        cb(null, true);
      } else {
        return cb(new Error("The event lies outside of the trip time or the " +
          "event start is after the event end time"), null);
      }
    });
  }
};

