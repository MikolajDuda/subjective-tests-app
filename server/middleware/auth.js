const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'Brak tokena, odmowa autoryzacji' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token jest nieprawidłowy' });
  }
};