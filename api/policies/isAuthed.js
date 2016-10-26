var config = require('../../config/database.js');
var jwt         = require('jwt-simple');

module.exports = function(req, res, next) {
  var token;
  if (req.headers && req.headers.authorization) {
    var parted = req.headers.authorization.split(' ');
    //console.log(req.headers.authorization);
    //console.log(parted);
    if (parted.length === 1) {
      token = parted[0];
    }else{
      return res.notFound('wtf?');
    }
  }else if (req.param('token')) {
    token = req.param('token');

    //to protect blueprints
    delete req.query.token;
  }else{
    return res.badRequest('put token in header or pass it as a parameter')
  }
  var decoded = jwt.decode(token, config.secret);
  //res.send('plz work ' + decoded.email);
  req.query.email = decoded.email;
  console.log(req.query.email);
  next();

};
