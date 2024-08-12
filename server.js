const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.USER_PASSWORD,
);
console.log(DB);

const app = require('./app');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con);
  });
const port = 3000;
// const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app is running');
});
