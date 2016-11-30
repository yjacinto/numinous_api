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

  //creates a Trip from parameters and inserts the creator of the trip
  //into the list of travelers.
  create: function(req, res){

    Trip.create({
      originCity: req.param('originCity'),
      destinationCity: req.param('destinationCity'),
      startDate: moment(req.param('startDate'), 'MM-DD-YYYY').format("YYYY-MM-DD"),
      endDate: moment(req.param('endDate'), 'MM-DD-YYYY').format("YYYY-MM-DD"),
      traveler: req.param('id')
    }).exec(function(err, newTrip){
      if (err) {
        return res.badRequest(err);
      }
      User.findOne({id: req.param('id')}).exec(function(err, traveler){
        console.log('after traveler');
        traveler.trips.add(newTrip.id);
        traveler.save(function(err){
          if(err){ return res.serverError(err); }
          console.log('Created new traveler');
          ChatRoom.create({
            trip: newTrip.id
          }).exec(function(err, chatroom){
            if(err){ return res.badRequest(err); }
            console.log('created a new chatroom with the id of ' + chatroom.id);
            return res.ok();
          });
        })
      });

      res.send(newTrip);
      //add user to the list of travelers of the trip
    });
  },

  //update the trip by trip_id, given the post data.
  update: function(req, res) {

    Trip.update({id: req.param('trip_id')}, {
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

    Trip.findOne(req.param('trip_id')).exec(function(err, trip){
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

    Trip.findOne({id: req.param('trip_id')}).populate('events')
      .exec(function (err, trip){
          if(err) {
            return res.badRequest(err);
          }
          return res.json(trip);
    });
  },

  getTravelersById: function(req,res){

    Trip.findOne({id: req.param('trip_id')}).populate('travelers')
      .exec(function (err, trip){
        if(err) {
          return res.badRequest(err);
        }
        return res.json(trip);
      });

  },


  //find hotel by trip id
  getHotelsById: function(req, res){

    Trip.find({id: req.param('trip_id')}).populate('hotels')
      .exec(function (err, trip){
        if(err){
          return res.badRequest(err);
        }
        return res.json(trip);
      });
  }


}//module

