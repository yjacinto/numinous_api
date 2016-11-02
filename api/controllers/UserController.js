/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getInfo: function(req,res){
    console.log(req);
    User.findOne({
      'email': req.param('email')
    }).exec(function(err,user){
      if(err){
        return res.notFound();
      }else{
        res.json({first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id
        })
      }
    })
  }
};

