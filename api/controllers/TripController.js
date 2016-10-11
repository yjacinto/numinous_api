/**
 * TripController
 *
 * @description :: Server-side logic for managing trips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {

    Trip.find().exec(function (err, trips) {

      if (err) {
        return res.serverError(res);
      }
      return res.json(trips);

    });
  },

  create: function(req, res){

    Trip.create({
      originCity: req.param('originCity'),
      destinationCity: req.param('destinationCity'),
      startDate: req.param('startDate'),
      endDate: req.param('endDate')
    }).exec(function(err, newTrip){

      if (err) {

        // If this is NOT a waterline validation error, it is a mysterious error indeed.
        var isWLValidationErr = _.isObject(err) && _.isObject(err.invalidAttributes);
        if (!isWLValidationErr) {
          return res.serverError(err);
        }

        // Otherwise, it must be a waterline validation error.

        // If it doesn't contain a problem with the password, then just handle is
        // using `res.badRequest()` like normal.
        if (!_.isArray(err.invalidAttributes.password)) {
          return res.badRequest(err);
        }

        //return standard error message
        return res.badRequest(err);
      }
      console.log('Created new trip');
      return res.ok();

    });
  },

  update: function(req, res) {
    Trip.update({id: req.param('id')}, {
      originCity: req.param('originCity'),
      destinationCity: req.param('destinationCity'),
      startDate: req.param('startDate'),
      endDate: req.param('endDate')
    }).exec(function afterwards(err, updated) {

      if (err) {
        return res.badRequest(err);
      }

      return res.json(updated);
    });
  },

  find: function (req, res){
    Trip.findOne(req.param('id')).exec(function(err, trip){

      if(err){
        console.log('error occurred');
      }

      return res.json(trip);
    });
  },

  getEvents: function(req, res){
    Trip.find({id: req.param('id')}).populate('events')
      .exec(function (err, Trip){
          if(err){
            return res.badRequest(err);
          }
          console.log('There are %d events in this trip.', Trip.events.length);

          return res.json(Trip);
    });
  }

}//module

