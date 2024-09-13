const express = require('express');

const router = express.Router();

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  getTourStats,
  getMontlyPlan,
} = require('../controllers/tourControllers');

const { protect, restrictTo } = require('../controllers/authController');
const { addReview } = require('../controllers/reviewController');

// router.param('id', checkId);
router.route('/top-5-cheap').get(aliasTopTour, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/montly-plan/:year').get(getMontlyPlan);
router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router.route('/:tourId/reviews').post(protect, restrictTo('user'), addReview);

module.exports = router;
