// Middlewares will handle different authentication, authorization and validation
const globalErrorHandler = require("./globalErrorHandler");
const isAuthenticated = require("./isAuthenticated");
const isCaching = require("./isCaching");
module.exports = {
  globalErrorHandler,
  isAuthenticated,
  isCaching,
};
