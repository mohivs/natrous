const express = require('express');
const multer = require('multer');
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require('../controllers/authController');
const {
  getAllUsers,
  updateMe,
  deleteMe,
  updateUser,
  deleteUser,
  getMe,
  getUser,
} = require('../controllers/userControllers');

const upload = multer({ dest: 'public/img/users' });

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

// protects all routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', upload.single('photo'), updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);
router.route('/:id').patch(updateUser).delete(deleteUser).get(getUser);

module.exports = router;
