/**
 * TripController
 *
 * @description :: Server-side logic for managing trips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  //returns all the trips in the database
  //throws serverError otherwise
  index: function (req, res) {

    Trip.find().exec(function (err, trips) {

      if (err) {
        return res.serverError(res);
      }

      return res.json(trips);
    });
  },

  //accepts the request parameters and creates a Trip in the database.
  //returns the newly created trip
  create: function(req, res){

    Trip.create({
      originCity: req.param('originCity'),
      destinationCity: req.param('destinationCity'),
      startDate: moment(req.param('startDate'), 'MM-DD-YYYY').format("YYYY-MM-DD"),
      endDate: moment(req.param('endDate'), 'MM-DD-YYYY').format("YYYY-MM-DD"),
      user: req.param('id')
    }).exec(function(err, newTrip){

      if (err) {
        return res.badRequest(err);
      }
      console.log('Created new trip');
      return res.json(newTrip);
    });
  },

  //update the trip by id, given the post data.
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

  //finds a trip by id
  findById: function (req, res){
    Trip.findOne(req.param('id')).exec(function(err, trip){
      if(err){
        return res.badRequest(err);
      }
      if(typeof trip === 'undefined'){
        return res.badRequest(err);
      }
      return res.json(trip);
    });
  },

  //find events by trip id
  getEventsById: function(req, res){
    Trip.find({id: req.param('id')}).populate('events')
      .exec(function (err, Trip){
          if(err) {
            return res.badRequest(err);
          }
          return res.json(Trip);
    });
  },

  //find hotel by trip id
  getHotelsById: function(req, res){
    Trip.find({id: req.param('id')}).populate('hotels')
      .exec(function (err, Trip){
        if(err){
          return res.badRequest(err);
        }
        return res.json(Trip);
      });
  }

}//module

