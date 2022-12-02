const { RedisService, ResponseService } = require("../services");
const { catchAsync } = require("../utils");

const useCache = catchAsync(async (req, res, next) => {
  const { username } = req.session;

  const data = await RedisService.getValue(username);
  if (data) {
    res.status(200).json(ResponseService.newSucess(data));
    return;
  }

  // If there is not cached data, set default
  RedisService.setValue(username, { timerSettings: {}, playlist: [] });

  next();
});

module.exports = useCache;
