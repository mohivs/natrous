const express = require('express');

const router = express.Router();

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTour,
} = require('../controllers/tourControllers');

// router.param('id', checkId);
router.route('/top-5-cheap').get(aliasTopTour, getAllTours);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
