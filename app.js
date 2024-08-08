const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log('1 middlware');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};

const getTour = (req, res) => {
  console.log(req.params);

  const tour = tours.find((tour) => tour.id + '' === req.params.id);
  console.log(tour);
  res.send('s');
};

const createTour = (req, res) => {
  const newId = tours.at(tours.length - 1).id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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

const updateTour = (req, res) => {
  const id = +req.params.id;
  // console.log(req.body);
  const tour = tours.find((tour) => tour.id === id);

  console.log(tour);

  res.send('done');
};

// app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour);

const port = 3000;
app.listen(port, () => {
  console.log('app is running');
});
