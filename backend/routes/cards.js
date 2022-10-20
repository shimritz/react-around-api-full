const router = require('express').Router();
const { validateCard } = require('../middleware/validation');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controller/cards');

router.get('/', getAllCards);
router.post('/', validateCard, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', disLikeCard);

module.exports = router;
