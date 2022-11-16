const { RedisService, ResponseService } = require("../services");
const { catchAsync } = require("../utils");

const isCaching = catchAsync(async (req, res, next) => {
  const { username } = req.session;

  const data = await RedisService.getValue(username);
  if (data) {
    res.status(200).json(ResponseService.newSucess(data));
    return;
  }

  next();
});

module.exports = isCaching;
