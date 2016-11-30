/**
 * TravelCompanionController
 *
 * @description :: Controller provides methods for management of companions within a
 *                  single trip.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /* Accepts a trip_id and companion_id and adds the associated user as a traveler
  ** to the trip.
  */
  addCompanion: function(req,res){
    Trip.findOne({id: req.param('trip_id')})
      .populate('travelers')
      .exec(function(err,trip){
        if(err) { return res.serverError(err); }
        if(!trip) {return res.notFound('Could not find trip with given ID'); }

        User.findOne({id: req.param('companion_id')})
          .exec(function(err, companion){
            if(err) {return res.serverError(err); }
            if(!companion){return res.notFound('Could not find a user with given ID');}

            trip.travelers.add(companion);
            trip.save(function(err){
              if(err){return res.serverError(err); }
              return res.ok('Added user to travel group');
            });
          });
    });
  },

  /* Accepts a trip_id and companion_id and deletes the associated user
  ** from the travel group as a traveler to the trip.
  */
  deleteCompanion: function (req, res){
    Trip.findOne({id: req.param('trip_id')})
      .populate('travelers')
      .exec(function(err,trip){
        if(err) { return res.serverError(err); }
        if(!trip) {return res.notFound('Could not find trip with given ID'); }

        User.findOne({id: req.param('companion_id')})
          .exec(function(err, companion){
            if(err) {return res.serverError(err); }
            if(!companion){return res.notFound('Could not find a user with given ID');}

            trip.travelers.remove(companion.id);
            trip.save(function(err){
              if(err){return res.serverError(err); }
              return res.ok('Deleted user from travel group');
            });
          });
      });
  }
};

