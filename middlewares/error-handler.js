const { ERROR_DEFAULT } = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT } = err;
  const message = statusCode === ERROR_DEFAULT ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
