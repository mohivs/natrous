const express = require('express');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController');
const { getAllUsers, updateMe } = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);

router.route('/').get(getAllUsers);

// router.route('/').get(getAllUsers).post(createUser);

// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
