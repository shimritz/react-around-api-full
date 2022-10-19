const Card = require('../models/cards');

const getAllCards = (req, res) =>
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() =>
      res.status(500).send({ message: 'An error as occured on the ss' })
    );

const createCard = (req, res) => {
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
      if (err.name === 'DocumentNotFound') {
        res.status(404).send({ message: 'Card not found' });

        res.status(400).send({ message: 'Data format is incorrect' });
      } else {
        res.status(500).send({ message: 'An error as occured on the ss' });
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.status = 404;
      throw error;
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new Error('You cannot delete someone elses card'));
      } else {
        Card.deleteOne(card).then(() => res.send({ data: card }));
      }
    })

    // return Card.findByIdAndRemove(cardId)
    //   .orFail(() => {
    //     const error = new Error('No card found for the specified id');
    //     error.status = 404;
    //     throw error;
    //   })
    //   .then((card) => {
    //     res.status(200).send({ message: '', data: card });
    //   })
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

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.params._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.status = 404;

      throw error;
    })
    .then((card) => res.status(200).send({ message: '', data: card }))
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

const disLikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.params._id;

  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.status = 404;

      throw error;
    })
    .then((card) => res.status(200).send({ message: '', data: card }))
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

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
};
