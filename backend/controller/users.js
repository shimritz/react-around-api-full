const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const JWT_SECRET = require('../helpers/config');

const getUsers = (req, res) =>
  Users.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send(err));

const getUserById = (req, res) => {
  const { id } = req.params;

  return Users.findById(id)
    .orFail(() => {
      const error = new Error('User id not found');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Invalid format of ID');
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const getCurrentUser = (req, res, next) => {
  getUserById(req.user._id, res, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, String(JWT_SECRET), {
        expiresIn: '7d',
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new Error('Incorrect email or password'));
    });
};

const createUser = (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { name, avatar, about, email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error('The user with the provided email already exists');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>
      Users.create({
        name,
        avatar,
        about,
        email,
        password: hash,
      })
    )
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = `${Object.values(err.errors)
          .map((error) => error.message)
          .join(',')}`;
        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: '...' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  const id = req.user._id;
  if (!name || !about) {
    return res.status(400).send({ message: 'Both name and job cant be empty' });
  }

  return Users.findByIdAndUpdate(
    id,
    { name, about },
    { new: true },
    { runValidators: true }
  )
    .orFail(() => {
      const error = new Error('User with specified id is not found');
      error.status = 404;

      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'The user id is not correct ' });
      } else if (err.status === 404) {
        res.status(404).send({ message: 'error has occured' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const id = req.user._id;

  if (!avatar) {
    return res.status(400).send({ message: 'avatar cant be empty' });
  }

  return Users.findByIdAndUpdate(
    id,
    { avatar },
    { new: true },
    { runValidators: true }
  )
    .orFail(() => {
      const error = new Error('User with specified id is not found');
      error.status = 404;

      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'The user id is not correct ' });
      } else if (err.status === 404) {
        res.status(404).send({ message: 'error has occured' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  login,
  updateAvatar,
  updateUser,
};
