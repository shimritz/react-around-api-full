const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../helpers/config');
// const UnauthorizedError = require('../errors/unauthorized-error');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(403).send({ message: 'no authorization header provided' });
    return;
  }
  console.log('token 1:', authorization);
  const token = authorization.substring(7, authorization.length);
  let payload;
  console.log('token 2:', String(token));
  try {
    console.log('secret:', String(JWT_SECRET));
    payload = jwt.verify(token, String(JWT_SECRET));
    console.log('payload', payload);
  } catch (err) {
    console.log('auth err:', err);
    // return next(new Error('Authorization Required'));
    res.status(403).send({ message: 'unauthorized' });
    return;
  }

  req.user = payload;

  next();
};

module.exports = auth;
