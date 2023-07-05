const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/auth-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new ErrorAuth('Необходимо авторизоваться');
  }

  req.user = payload;
  next();
};
module.exports = auth;
