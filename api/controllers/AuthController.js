/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var config   = require('../../config/database.js');
var jwt      = require('jwt-simple');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  authenticate: function(req,res){
    User.findOne({
      email: req.param('email')
    }).exec(function(err, user){
      if(err){
        res.badRequest();
      }
      if(!user){
        res.notFound("Couldn't find the user");
      }else{
        User.comparePassword(req.param('password'), user, function(err, isMatch){
          if(err){return res.serverError(err)};
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            console.log(token);
            // return the information including token as JSON
            res.json({success: true, token: /*'JWT ' +*/ token});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  },


  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },

  signup: function(req, res) {
    if(!req.param('email') || !req.param('password') ||
      !req.param('first_name') || !req.param('last_name')){
      res.json({success: false, msg: 'Please enter name, email, and passwords.'});
    }else {
      User.create({
        first_name: req.param('first_name'),
        last_name: req.param('last_name'),
        email: req.param('email'),
        password: req.param('password')
      }).exec(function(err,user){
        if (err) { return res.serverError(err); }
        return res.ok();
      });

    }
  }




};
