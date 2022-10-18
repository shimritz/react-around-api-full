/* eslint-disable no-console */
const express = require('express');

const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb');
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const cardRouter = require('./cards');
// const userRouter = require('./users');

const { createUser, login } = require('./controller/users');

app.post('/signup', createUser);
app.post('/signin', login);

app.get('/hw', (req, res) => {
  res.send('Hello World!');
});

router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);

app.use('/', router);

// app.use('/users', usersRouter);
// app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on port ${PORT}`);
});
