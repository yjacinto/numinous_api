/*
* This policy ensures that the token sent along with the
* logged in user's request is a valid token and if so, allows actions
* to be performed on the controllers defined in /config/polices.js
*
*/

var config = require('../../config/database.js');
var jwt    = require('jwt-simple');

module.exports = function(req, res, next) {
  var token;
  if (req.headers && req.headers.authorization) {
    var parted = req.headers.authorization.split(' ');
    //console.log(req.headers.authorization);
    //console.log(parted);
    if (parted.length === 1) {
      token = parted[0];
    }else{
      return res.notFound();
    }
  }else if (req.param('token')) {
    token = req.param('token');

    //to protect blueprints
    delete req.query.token;
  }else{
    return res.badRequest('No token sent with the request')
  }
  var decoded = jwt.decode(token, config.secret);
  console.log(decoded);
  req.query.id = decoded.id;
  next();
};
