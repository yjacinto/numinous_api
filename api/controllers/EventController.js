/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var moment = require('moment');

module.exports = {

  create: function (req, res) {

    Event.create({
      name: req.param('name'),
      startTime: req.param('startTime'),
      endTime: req.param('endTime'),
      location: req.param('location'),
      expected: req.param('expectedCost'),
      trip: req.param('trip')
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

