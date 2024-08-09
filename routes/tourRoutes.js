const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
} = require('../controllers/tourControllers');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour);

module.exports = router;
