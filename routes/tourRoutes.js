const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');

const { getAllTours, getTour, createTour, updateTour, deleteTour } =
  tourController;
// Define routes for tours
// GET all tours, POST a new tour

// router.param("id",  checkID); // Middleware to check ID for specific routes
//router.param("id", checkBody); // Middleware to check body for specific routes

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
