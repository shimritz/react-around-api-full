const router = require('express').Router();
// const auth = require('../middleware/auth');
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controller/cards');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', disLikeCard);

module.exports = router;
