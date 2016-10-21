/**
 * Created by edwin on 10/18/16.
 */


module.exports = {

  //checks whether start or end time is before the start time.
  startEndTimeValidate: function (options, done) {
    var start = moment(options.start, "MM-DD-YYYY");
    console.log(start.format());
    var end = moment(options.end, "MM-DD-YYYY");
    console.log(end.format());

    //return true if trip start <  event start < event end < trip end
    if (end > start) {
      done(null, true);
    } else {
      return done(new Error("event start is after the event end time"), null);
    }
  }


}
