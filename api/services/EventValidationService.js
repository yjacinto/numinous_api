module.exports = {

    //purpose of this method is to ensure that an event startDate lies within an endDate
    validateDates: function(options, cb) {
      var eventStart = new Date(options.startTime);
      var eventEnd = new Date(options.endTime);
      var tripId = options.trip;
        Trip.findOne({
          id: tripId
        }).exec(function getTripTimes(err, trip) {

          if (err) {
            console.log('Trip was not found');

          }
            var startDateOfTrip = new Date(trip.startDate);
            var endDateOfTrip = new Date(trip.endDate);

            //return true if trip start <  event start < event end < trip end
            if ((eventStart > startDateOfTrip) && (eventStart < endDateOfTrip)
              && (eventEnd < endDateOfTrip) && (eventEnd > startDateOfTrip)
              && (eventEnd > eventStart)) {
              cb(null, true);
            } else {
              cb(null, false);
            }
        });
      }
}
