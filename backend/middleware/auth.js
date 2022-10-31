const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const JWT_SECRET = require('../helpers/config');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('no Authorization header provided'));
    return;
  }
  const token = authorization.substring(7, authorization.length);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET.toString());
  } catch (err) {
    next(new UnauthorizedError('Authorization Required'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
