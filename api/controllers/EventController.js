/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var moment = require('moment');

module.exports = {

  //creates an event and returns the created event upon success.
  create: function (req, res) {
    Event.create({
      name: req.param('name'),
      startTime: moment(req.param('startTime')).format("YYYY-MM-DD HH:mm"),
      endTime: moment(req.param('endTime')).format("YYYY-MM-DD HH:mm"),
      location: req.param('location'),
      place_id: req.param('place_id'),
      trip: req.param('trip_id')
    }).exec(function (err, newEvent) {
      if (err) {
        return res.badRequest(err);
      }
      console.log('Created new Event:' + newEvent);
      return res.json(newEvent);

    });
  },

  delete: function (req, res) {

    Event.destroy({id: req.params('id')}).exec(function (err) {
      if (err) {
        return res.negotiate(err);
      }
      return res.ok();
    });
  },

  update: function (req, res) {

    Event.update({id: req.param('id')}, {}).exec(function (err, updated) {
      if (err) {
        res.badRequest(err);
      }
      return res.json(updated);
    });
  },

  find: function(req,res){

    Event.findOne({id: req.param('id')}).exec(function(err, event) {
      if(err){
        res.badRequest(err);
      }
      return res.json(event);
    });
  }


};

