const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateAvatar,
  updateUser,
} = require('../controller/users');

router.get('/', auth, getUsers);

router.get('/:id', auth, getUserById);
router.get('/users/me', auth, getCurrentUser);

router.patch('/me/avatar', auth, updateAvatar);
router.patch('/me', auth, updateUser);

module.exports = router;
