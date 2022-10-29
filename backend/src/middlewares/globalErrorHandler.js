/* eslint-disable no-param-reassign */
const { ResponseService } = require("../services");
const Error = require("../config/constant/Error");
const handleCastErrorDB = () => {
  // const message = `Invalid ${err.path}: ${err.value}.`;
  return ResponseService.newError(
    Error.CastError.errCode,
    Error.CastError.errMessage
  );
};

const handleDuplicateFieldsDB = () => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // console.log(value);

  // const message = `Duplicate field value: ${value}. Please use another value!`;
  return ResponseService.newError(
    Error.DuplicateFieldError.errCode,
    Error.DuplicateFieldError.errMessage
  );
};

// const handleValidationErrorDB = (err) => {
//   const errors = Object.values(err.errors).map((el) => el.message);

//   const message = `Invalid input data. ${errors.join('. ')}`;
//   return new AppError(message, 400);
// };
const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    code: 1,
    message: "Unsuccessfully",
    statusCode: err.statusCode,
    errCode: err.errCode,
    errMessage: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    code: 1,
    message: "Unsuccessfully",
    statusCode: err.statusCode,
    errCode: err.errCode,
    errMessage: err.message,
  });
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  if (err.name === "CastError") err = handleCastErrorDB();
  if (err.code === 11000) err = handleDuplicateFieldsDB();

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(err, res);
  }
};
