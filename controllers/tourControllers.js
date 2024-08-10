const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.checkId = (req, res, next, val) => {
  console.log(`the id is ${val}`);
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (req.body.name && req.body.price) {
    return next();
  }
  res.status(400).json({ status: 'failed', message: 'missing name or price' });
};

exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const tour = tours.find((tour) => tour.id + '' === req.params.id);
  console.log(tour);
  res.send('s');
};

exports.createTour = (req, res) => {
  const newId = tours.at(tours.length - 1).id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        result: tours.length,
        data: { tour: newTour },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  // console.log(req.body);
  const tour = tours.find((tour) => tour.id === id);

  console.log(tour);

  res.send('done');
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
