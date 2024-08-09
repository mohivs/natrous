const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

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
