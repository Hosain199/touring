const Tour = require('../models/tourModel'); // Import the Tour model

// const toursFilePath = path.join(
//   __dirname,
//   "..",
//   "dev-data",
//   "data",
//   "tours-simple.json"
// );
// if (!fs.existsSync(toursFilePath)) {
//   console.error("Tours data file not found:", toursFilePath);
//   process.exit(1); // Exit the application if the file is not found
// }

// const tours = JSON.parse(fs.readFileSync(toursFilePath, "utf-8"));

// const checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }
//   next(); // Pass control to the next middleware
// };

// const checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price){
//     return res.status(400).json({
//       status: "fail",
//       message: "Missing name or price in request body",
//     });
//   }
//   next();
// };

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find(); // Use Mongoose to find all tours

    //   if (!tour || tour.length === 0) {
    //   return res.status(404).json({
    //     status: 'fail',
    //     message: 'No tours found',
    //   });
    // }
    //  // Return the tours in the response
    // console.log(`Request received at: ${req.requestTime}`);
    // console.log(`Number of tours found: ${tours.length}`);
    // console.log(`Tours data: ${JSON.stringify(tours, null, 2)}`);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime, // Include request time in the response
      results: tours.length, // Include the number of tours found
      data: {
        tours, // Return the tours in the data object
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'error',
      message: 'Error fetching tours',
    });
  }
};
// Return the tours in the response

const getTour = async (req, res) => {
  // const id = req.params.id * 1; // Convert string to number
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime, // Include request time in the response
    data: {
      tour: tour,
    },
  });
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body); // Use Mongoose to create a new tour

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime, // Include request time in the response
      data: {
        tour: newTour, // Return the newly created tour
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message, // Return the error message
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure that the updated document meets the schema validation
    });
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime, // Include request time in the response
      data: {
        tour: tour, // Return the updated tour
      },
    });

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message, // Return the error message
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found',
      });
    }
    res.status(204).json({
      status: 'success',
      message: 'Tour deleted successfully',
      requestedAt: req.requestTime, // Include request time in the response
      data: null, // No content to return for delete operation
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message, // Return the error message
    });
  }
};

module.exports = {
  //checkID,
  //checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
