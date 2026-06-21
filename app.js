const path = require('path');
const express = require('express');
const morgan = require('morgan');
// Import morgan for logging
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1. Middleware Setup
//console.log(process.env.NODE_ENV); // Log the environment (development or production)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // 'dev' format for concise output colored by response
}

// Use morgan for logging HTTP requests
// 'dev' format for concise output colored by response status

app.use(express.json()); // Middleware to parse JSON bodies
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   req.requestTime = new Date().toISOString(); // Local timezone
//   console.log(`Request received at: ${req.requestTime}`);
//   next(); // Pass control to the next middleware
// });

// 3. Define routes

// Use tour router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not Found',
  });
});
// Middleware to handle errors
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: 'error',
//     message: 'Internal Server Error',
//   });
// });

//4. Start the server
module.exports = app; // Export the app for testing or further configuration
