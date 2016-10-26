/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var config = require('../../config/database.js');
var jwt         = require('jwt-simple');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
/*
  login: function(req, res) {

    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.badRequest('failed to authenticate');
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.ok('successfully logged in');
      });

    })(req, res);
  },*/

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
    if(!req.param('email') || !req.param('password')){
      res.json({success: false, msg: 'Please enter pass name and password.'});
    }else {
      User.create({
        email: req.param('email'),
        password: req.param('password')
      }).exec(function(err,user){
        if (err) { return res.serverError(err); }
        return res.ok();
      });

    }
  }




};
