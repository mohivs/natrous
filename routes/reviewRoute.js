const express = require('express');
const {
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, addReview);

router.route('/:id').delete(deleteReview).patch(updateReview).get(getReview);

module.exports = router;
