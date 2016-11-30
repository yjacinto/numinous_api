/**
 * UserProfileController
 *
 * @description :: Server-side logic for managing Userprofiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  getUserProfile: function(req,res){
    console.log(req.param('id'));
    UserProfile.findOne({
      user: req.param('id')
    }).exec(function(err, userProfile){
      if(err) { return res.badRequest('coudldnt find user');}
      console.log(userProfile);
      User.findOne({
        'id': req.param('id')
      }).exec(function(err,user){
        if(user == 'undefined'){
          return res.notFound();
        }
        if(err){
          return res.badRequest(err);
        }else{
          res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            bio: userProfile.bio,
            email: user.email,
            id: user.id,
            createdAt: userProfile.createdAt,

          })
        }
      });
    })
  },

  editProfile: function(req,res){
    console.log(req.param('id'));
    console.log(req.param('about'));
    UserProfile.update({
      user: req.param('id')
    },{
      bio: req.param('bio')
    }).exec(function(err, updatedProfile) {
      if(err){ return res.badRequest(err);}
      console.log(updatedProfile);
      res.json(updatedProfile.bio);
    });
  }


};

