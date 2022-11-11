const Error = require("../config/constant/Error");
const { ResponseService, JwtService } = require("../services");
const { catchAsync } = require("../utils");

const isAuthenticated = catchAsync(async (req, res, next) => {
  if (!req.session.username) {
    throw ResponseService.newError(
        Error.SessionExpired.errCode,
        Error.SessionExpired.errMessage
      );
  } ;

  next()
});

module.exports = isAuthenticated;
