/**
 * TravelCompanionController
 *
 * @description :: Server-side logic for managing travelcompanions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //add a TravelCompanion to the trip.
  addCompanion: function(req,res){
    console.log(req.param());
    TravelCompanion.create({
      //user: req.param('id'),
      trip: req.param('trip_id'),
      users: req.param('companion_id')
    }).exec(function(err, companion){
      if(err){
        return res.badRequest('Failed to add travel companion');
      }
      res.json(companion);
    });
  },

  //delete TravelCompanion from the trip
  deleteCompanion: function(req,res){
    TravelCompanion.delete({
      trip: req.param('trip_id'),
      users: req.param('companion_id')
    }).exec(function(err, companion){
      if(err){
        return res.badRequest('Failed to delete the travel companion from the trip');
      }
      res.json(companion);
    });

  }

  //view all companions.
  //fix beforeCreate.


};

