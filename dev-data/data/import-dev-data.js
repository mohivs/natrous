const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.USER_PASSWORD,
);
// console.log(DB);
const operation = async () => {
  await mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('connect to DB from importer'));

  //   READ JSON FILE
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

  //IMPORT DATA INTO DB
  const importData = async () => {
    try {
      await Tour.create(tours);
      console.log('data successfully loaded');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };

  //DELETE ALL DATA FROM COLLECTION AT SAME TIME
  const deleteData = async () => {
    try {
      console.log('jj');
      await Tour.deleteMany();
      console.log('data successfully deleted');
    } catch (err) {
      console.log(err);
    }
    process.exit();
  };

  if (process.argv[2] === '--import') {
    importData();
  }
  if (process.argv[2] === '--delete') {
    deleteData();
  }
  // console.log(process.argv);
};

operation();
