/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  getInfo: function(req,res){
    User.findOne({
      'id': req.param('id')
    }).exec(function(err,user){
      if(user == 'undefined'){
        return res.notFound();
      }
      if(err){
        return res.badRequest();
      }else{
        res.json({first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id
        })
      }
    })
  },

  getUserTrips: function(req,res){
    User.find({id: req.param('id')}).populate('trips')
      .exec(function (err, Trips){
        if(err){
          return res.badRequest(err);
        }
        return res.json(Trips);
      });
  }
};

