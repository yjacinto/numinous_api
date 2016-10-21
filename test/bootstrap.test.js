var sails = require('sails');
var Trip = require('../api/models/Trip');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(7000);

  sails.lift({
    // configuration for testing purposes
  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  //Trip.destroy({}).exec(function(err,xx){});
  sails.lower(done);
});
