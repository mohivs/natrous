const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

exports.createUser = (req, res) => {
  const newId = users.at(tours.length - 1).id + 1;
  const newUser = { id: newId, ...req.body };
  users.push(newUser);

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { user: newUser },
      });
    },
  );

  // const newUsers =
};

exports.users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8'),
);

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet define',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet define',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not yet define',
  });
};
