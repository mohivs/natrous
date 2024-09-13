const express = require('express');
const { addReview, getAllReviews } = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), addReview);

module.exports = router;
