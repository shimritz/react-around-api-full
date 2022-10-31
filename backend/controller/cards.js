const Card = require('../models/cards');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

const getAllCards = (req, res, next) =>
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const likes = [];
  Card.create({
    name,
    link,
    owner,
    likes,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Data format is incorrect'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => new NotFoundError('No card found for the specified id'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('You cannot delete someone elses card'));
      } else {
        Card.deleteOne(card).then(() => res.send({ data: card }));
      }
    })

    .catch(next);
};

const likeCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(new NotFoundError('Card not found'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card id' });
      } else if (err.status === 404) {
        res.status(404).send({ message: 'not found' });
      } else {
        res.status(500).send({ message: 'An error occured' });
      }
    });
};

const disLikeCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(
    id,
    { $pull: { likes: userId } }, // remove _id to the array
    { new: true }
  )
    .orFail(new NotFoundError('Card not found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
};
