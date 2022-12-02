// Middlewares will handle different authentication, authorization and validation
const globalErrorHandler = require("./globalErrorHandler");
const isAuthenticated = require("./isAuthenticated");
const useCache = require("./useCache");
module.exports = {
  globalErrorHandler,
  isAuthenticated,
  useCache,
};
