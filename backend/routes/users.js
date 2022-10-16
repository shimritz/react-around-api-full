const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateUser,
} = require('../controller/users');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserById);

router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
