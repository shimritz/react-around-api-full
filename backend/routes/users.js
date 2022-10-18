const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateAvatar,
  updateUser,
} = require('../controller/users');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
