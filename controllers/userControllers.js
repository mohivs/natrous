const fs = require('fs');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { users },
  });
};

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
    }
  );

  // const newUsers =
};

exports.users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
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
