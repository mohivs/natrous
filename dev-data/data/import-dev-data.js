const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');

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
  const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
  const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
  );

  //IMPORT DATA INTO DB
  const importData = async () => {
    try {
      await Tour.create(tours);
      await Review.create(reviews);
      await User.create(users, { validateBeforeSave: false });
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
      await User.deleteMany();
      await Review.deleteMany();
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
