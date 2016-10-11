/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(res,req) {
    Hotel.create({
      name: req.param('name'),
      numNights: req.param('numNights'),
      address: req.param('address'),
      expectedCost: req.param('expectedCost'),
      trip: req.param('trip')
    }).exec(function (err, hotel) {
      if (err) {
        res.badRequest(err);
      }
      res.json(hotel);
    });
  },

  update: function(res, req){
    Hotel.update({id:req.param('id')}, {
      name: req.param('name'),
      startTime: req.param('startTime'),
      endTime: req.param('endTime'),
      numNights: req.param('numNights'),
      location: req.param('location'),
      expectedCost: req.param('expectedCost'),
      trip: req.param('trip')
    }).exec(function(res, hotel){
      if (err) {
        res.badRequest(err);
      }
      res.json(hotel);
    });
  }



};

