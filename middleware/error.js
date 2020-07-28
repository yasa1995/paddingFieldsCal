const errorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //log to console for dev
  console.log(err);

  //Mongoose bad objectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new errorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Resource are found with duplicate`;
    error = new errorResponse(message, 400);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
