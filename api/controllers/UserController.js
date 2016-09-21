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
   }
};

