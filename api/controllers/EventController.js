/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res) {

    EventValidationService.validateDates({
      startTime: req.param('startTime'),
      endTime: req.param('endTime'),
      trip: req.param('trip')
    }, function (err, withinParameters) {
      if (err) {
        console.log(err);
      }
      if (withinParameters) {
        Event.create({
          name: req.param('name'),
          startTime: req.param('startTime'),
          endTime: req.param('endTime'),
          location: req.param('location'),
          expected: req.param('expectedCost'),
          trip: req.param('trip')
        }).exec(function (err, newEvent) {

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
          console.log('Created new Event:' + newEvent);
          return res.ok();

        });
      }
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
    Event.findOne({id: req.param('id')}).exec(function(err, event){
      if(err){
        res.badRequest(err);

      }
      return res.json(event);
    });
  }


};

