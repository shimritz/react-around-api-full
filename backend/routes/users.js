const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateAvatar,
  updateUser,
} = require('../controller/users');

router.get('/', getUsers);

router.get('/:id', getUserById);
router.get('/users/me', getCurrentUser);

router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
