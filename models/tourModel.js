const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true, // Remove leading and trailing spaces
    maxlength: [40, 'A tour name must have less or equal than 40 characters'],
    minlength: [10, 'A tour name must have more or equal than 10 characters'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  discount: {
    type: Number,
    default: 0,
    validate: {
      validator: function (val) {
        // This will only work on CREATE and SAVE
        return val < this.price; // Discount must be less than price
      },
      message: 'Discount ({VALUE}) should be less than the price',
    },
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty level'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be either easy, medium, or difficult',
    },
    set: (val) => val.toLowerCase(),
  },
  summary: {
    type: String,
    trim: true, // Remove leading and trailing spaces
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true, // Remove leading and trailing spaces
    required: [true, 'A tour must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String], // Array of strings for multiple images
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startDates: [Date], // Array of dates for tour start dates
  secretTour: {
    type: Boolean,
    default: false,
    select: false, // Exclude secret tours from query results by default
  },
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User', // Reference to User model
    },
  ],
});

const Tour = mongoose.model('Tour', tourSchema); // Create a model from the schema

module.exports = Tour; // Export the model for use in other files
