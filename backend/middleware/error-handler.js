const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const {
      details: [errorDetails],
    } = errorBody;

    res.status(400).json({
      ...errorDetails,
    });

    next(err);
  }

  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'An error has occured on the server' : err.message;
  res.status(statusCode).send({ message });
  next(err);
};

module.exports = { errorHandler };
