/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const router = require('express').Router();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
const NotFoundError = require('./errors/not-found-error');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb');
const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
// const cardRouter = require('./cards');
// const userRouter = require('./users');

const { createUser, login } = require('./controller/users');
const { errorHandler } = require('./middleware/error-handler');
const {
  validateAuthentication,
  validateUser,
} = require('./middleware/validation');

app.use(requestLogger);

// TODO: remove after review
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post('/signup', validateUser, createUser);
app.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);

app.use('/', router);
app.use(errorLogger);
app.use(errors);

app.use(errorHandler);

router.use((req, res, next) => {
  next(new NotFoundError('No page found for the specific route'));
});
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${PORT}`);
});
