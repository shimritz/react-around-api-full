const router = require('express').Router();
const { validateCard, validateObjId } = require('../middleware/validation');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controller/cards');

router.get('/', getAllCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateObjId, deleteCard);
router.put('/:id/likes', validateObjId, likeCard);
router.delete('/:id/likes', validateObjId, disLikeCard);

module.exports = router;
