const fs = require('fs');
const path = require('path');

const UsersFilePath = path.join(
  __dirname,
  '..',
  'dev-data',
  'data',
  'users.json',
);
if (!fs.existsSync(UsersFilePath)) {
  console.error('Users data file not found:', UsersFilePath);
  process.exit(1); // Exit the application if the file is not found
}
const users = JSON.parse(fs.readFileSync(UsersFilePath, 'utf-8'));

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime, // Include request time in the response
    results: users.length,
    data: {
      users: users, // Assuming users are stored in the same file for simplicity
    },
  });
};

const getUser = (req, res) => {
  const id = req.params.id * 1; // Convert string to number
  const user = users.find((el) => el.id === id); // Assuming users are stored in the same file for simplicity
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime, // Include request time in the response
    data: {
      user: user,
    },
  });
};
const createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1; // Generate new ID
  const newUser = Object.assign({ id: newId }, req.body); // Assuming users are stored in the same file for simplicity
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        requestedAt: req.requestTime, // Include request time in the response
        data: {
          user: newUser,
        },
      });
    },
  );
};
const updateUser = (req, res) => {
  const id = req.params.id * 1; // Convert string to number
  const user = users.find((el) => el.id === id); // Assuming users are stored in the same file for simplicity
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  // Update the user with the new data
  Object.assign(user, req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime, // Include request time in the response
        data: {
          user: user,
        },
      });
    },
  );
};
const deleteUser = (req, res) => {
  const id = req.params.id * 1; // Convert string to number
  const userIndex = users.findIndex((el) => el.id === id); // Assuming users are stored in the same file for simplicity
  if (userIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }
  // Delete the user
  users.splice(userIndex, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime, // Include request time in the response
        data: null,
        message: 'User deleted successfully',
      });
    },
  );
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
