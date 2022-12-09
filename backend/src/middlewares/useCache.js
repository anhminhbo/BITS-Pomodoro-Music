const { RedisService, ResponseService } = require("../services");
const { catchAsync } = require("../utils");

const useCache = catchAsync(async (req, res, next) => {
  const { username } = req.session;

  const cachedData = await RedisService.getValue(username);
  if (cachedData) {
    res.body = ResponseService.newSucess(cachedData);
    res.status(200).json(res.body);
    return;
  }

  // // If there is no cached data, set default
  // RedisService.setValue(username, { timerSettings: {}, playlist: [] });

  next();
});

module.exports = useCache;
