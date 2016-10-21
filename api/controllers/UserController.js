/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

   getAllUsers: function (req, res) {
      var userid = req.param('id');
      User.query('SELECT user.id FROM numinousdb.user', function (err, records) {
         if(err) {
            console.log("Error: " + err);
         }
         else {
            return res.send(records);
         }
      });
   },

   create: function(req, res){
     User.create({
       email : req.param('email'),
       password : req.param('password')
     }).exec(function (err, newUser) {
       if(err) {
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
       console.log('Success: New User Created');
       return res.ok();

     });
   }
};

