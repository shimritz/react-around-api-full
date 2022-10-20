const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../helpers/config');
const UnauthorizedError = require('../errors/unauthorized-error');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(403).send({ message: 'no authorization header provided' });
    return;
  }
  const token = authorization.substring(7, authorization.length);
  let payload;
  try {
    payload = jwt.verify(token, String(JWT_SECRET));
  } catch (err) {
    next(new UnauthorizedError('Authorization Required'));
    // res.status(403).send({ message: 'unauthorized' });
  }

  req.user = payload;

  next();
};

module.exports = auth;
