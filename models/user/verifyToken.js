var jwt = require('jsonwebtoken');
var config = require('../../config');

let verifyToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ error: true, message: 'No token provided.' });
  }
  jwt.verify(token, config.secret, function(err, dtoken) {
    if (err)
    return res.status(500).json({ error: true, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userID = dtoken.id;
    next();
  });
}
module.exports = verifyToken;