const router = require('express').Router();
const {
  validateObjId,
  validateAvatar,
  validateProfile,
} = require('../middleware/validation');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateAvatar,
  updateUser,
} = require('../controller/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);
router.get('/:id', validateObjId, getUserById);

router.patch('/me/avatar', validateAvatar, updateAvatar);
router.patch('/me', validateProfile, updateUser);

module.exports = router;
