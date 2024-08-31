const express = require('express');
const { signup, login } = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userControllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(getAllUsers);

// router.route('/').get(getAllUsers).post(createUser);

// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
