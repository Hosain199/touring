const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Import the Tour model
const Tour = require('../models/tourModel');

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'),
);

// Filter out incomplete tours (only keep tours with all required fields)
const completeTours = tours.filter(
  (tour) =>
    tour.name &&
    tour.name.length >= 10 &&
    tour.duration &&
    tour.maxGroupSize &&
    tour.difficulty &&
    tour.price &&
    tour.summary &&
    tour.description &&
    tour.imageCover,
);

// Remove duplicates - keep only the first occurrence of each tour name
const uniqueTours = [];
const seenNames = new Set();

completeTours.forEach((tour) => {
  // Only add the tour if we haven't seen this name before
  if (!seenNames.has(tour.name)) {
    seenNames.add(tour.name);
    uniqueTours.push(tour);
  }
});

console.log(
  `Found ${tours.length} total tours, ${completeTours.length} complete tours, ${uniqueTours.length} unique tours (duplicates removed)`,
);

// Import data into database
const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
    );
    console.log('DB connection successful!');

    // Clear existing data
    await Tour.deleteMany();
    console.log('Data successfully deleted!');

    // Import new data
    await Tour.create(uniqueTours);
    console.log('Data successfully loaded!');

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
    );
    console.log('DB connection successful!');

    await Tour.deleteMany();
    console.log('Data successfully deleted!');

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Check command line arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
