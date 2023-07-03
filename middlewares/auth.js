const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'secret-cay');
  } catch (err) {
    throw new Error('Необходимо авторизоваться');
  }

  req.user = payload;
  next();
};
module.exports = auth;
