const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ErrorAuth('Необходимо авторизоваться'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new ErrorAuth('Необходимо авторизоваться');
  }

  req.user = payload;
  next();
};
module.exports = auth;
