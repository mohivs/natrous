const Tour = require('../models/tourModel');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // ‍‍1A) FILTERING
    const queryObj = { ...req.query };
    const excludeField = ['page', 'sort', 'limit', 'fields'];
    excludeField.forEach((item) => delete queryObj[item]);

    // 1B) ADVANCE FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));
    // 2) SORTING
    if (req.query.sort) {
      query = query.sort(req.query.sort.replaceAll(',', ' '));
    } else {
      query = query.sort('-createdAt');
    }
    // 3) FIELD LIMITING

    if (req.query.fields) {
      query = query.select(req.query.fields.replaceAll(',', ' '));
    } else {
      query = query.select('-__v');
    }

    // 4) pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('this page does not exist');
    }
    // EXCUTE QUERY
    const tours = await query;

    // SEND RESPOND
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
