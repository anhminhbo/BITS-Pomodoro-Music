// Middlewares will handle different authentication, authorization and validation
const globalErrorHandler = require("./globalErrorHandler");
const isAuthenticated = require("./isAuthenticated");

module.exports = {
  globalErrorHandler,
  isAuthenticated,
};
