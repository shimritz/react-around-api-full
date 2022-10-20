/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-error');

mongoose.connect('mongodb://localhost:27017/aroundb');
const { PORT = 3001 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const cardRouter = require('./cards');
// const userRouter = require('./users');

const { createUser, login } = require('./controller/users');
const { errorHandler } = require('./middleware/error-handler');
const {
  validateAuthentication,
  validateUser,
} = require('./middleware/validation');

app.post('/signup', validateUser, createUser);
app.post('/signin', validateAuthentication, login);

app.get('/hw', (req, res) => {
  res.send('Hello World!');
});

router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Not found'));
});
app.use('/', router);

app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${PORT}`);
});
