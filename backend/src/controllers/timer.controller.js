const { ResponseService, TimerService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getSettings = catchAsync(async (req, res) => {
  const { username } = req.session;
  const timerSettings = await TimerService.getSettings(username);

  res.status(200).json(ResponseService.newSucess({ timerSettings }));
});

const updateSettings = catchAsync(async (req, res) => {
  const { username } = req.session;
  const { timerSettings } = req.body;
  if (!timerSettings) {
    throw ResponseService.newError(
      Error.EmptyTimerSettings.errCode,
      Error.EmptyTimerSettings.errMessage
    );
  }
  await TimerService.updateSettings(username, timerSettings);

  res.status(200).json(ResponseService.newSucess());
});

module.exports = { getSettings, updateSettings };
