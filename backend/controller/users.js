/* eslint-disable indent */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const JWT_SECRET = require('../helpers/config');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const getUsers = (req, res) =>
  Users.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send(err));

const getUserById = (req, res, next) => {
  Users.findById(req.user._id)
    .orFail(() => new NotFoundError('User with specified id is not found'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  getUserById(req, res, next);
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

const createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { name, avatar, about, email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'The user with the provided email already exists'
        );
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
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(',')}`
          )
        );
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  const id = req.user._id;

  return Users.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError('User with specified id is not found'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const id = req.user._id;

  return Users.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError('User with specified id is not found'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
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
