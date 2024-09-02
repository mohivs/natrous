// original
const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  // console.log(err.errors.message);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorPro = (err, res) => {
  console.log(err);
  if (err.isOperatinal) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'somthing went wrong',
    });
  }
};

const handelCastErrorDb = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handelDuplicateFieldsDb = (err) => {
  console.log(`hi from handelDuplicateFieldsDb ${err.keyValue.name}`);
  // const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. please use anoter value!`;
  return new AppError(message, 400);
};

const handelValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('invalid token. please login agian', 401);

const handleJWTExpired = () =>
  new AppError('youre token has expired. please log in again', 401);

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log(`error is ${err}`);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    // res.status(400).json({ err, error });
    // console.log(error.name);
    if (err.name === 'CastError') error = handelCastErrorDb(error);
    if (error.code === 11000) error = handelDuplicateFieldsDb(error);
    if (err.name === 'ValidationError') error = handelValidationErrorDb(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpired(error);

    sendErrorPro(error, res);
  }
};
