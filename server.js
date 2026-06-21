/* eslint-disable no-console */
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); // Load environment variables from .env file

const app = require('./app'); // Import the app from app.js

//console.log(process.env); // Log the environment (development or production)
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
); // Replace <PASSWORD> with the actual password from environment variables

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// const testTour = new Tour({
//   name: 'Test Tour',
//   rating: 4.7,
//   price: 199,
//   difficulty: 'easy',
//   createdAt: new Date(),
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log('Test tour created:', doc);
//   })
//   .catch((err) => {
//     console.error('Error creating test tour:', err);
//   });
// Check if the environment is set to development

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
