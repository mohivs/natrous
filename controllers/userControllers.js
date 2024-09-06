const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedfields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedfields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1)create error if user POSTs passsword data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route is not for password updates.please use /updateMtPassword',
        400,
      ),
    );
  }
  // 2)update user document
  const filteredBody = filterObj(req.body, 'email', 'name');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // console.log(updatedUser);

  res.status(200).json({ status: 'success', data: { user: updatedUser } });
});

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
