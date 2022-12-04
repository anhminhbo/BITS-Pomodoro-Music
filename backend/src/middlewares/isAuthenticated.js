const Error = require("../config/constant/Error");
const { ResponseService } = require("../services");
const { catchAsync } = require("../utils");

const isAuthenticated = catchAsync(async (req, res, next) => {
  if (!req.session.username) {
    res.body = {
      errCode: Error.SessionExpired.errCode,
      errMessage: Error.SessionExpired.errMessage,
    };
    throw ResponseService.newError(
      Error.SessionExpired.errCode,
      Error.SessionExpired.errMessage
    );
  }

  next();
});

module.exports = isAuthenticated;
