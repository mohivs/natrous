const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ messaage: 'Hello wo' });
// });

// app.post('/', (req, res) => {
//   res.send('you send somthing');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const tour = tours.find((tour) => tour.id + '' === req.params.id);
  console.log(tour);
  res.send('s');
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log('app is running');
});
