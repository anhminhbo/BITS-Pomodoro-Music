const { ResponseService, TimerService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getSettings = catchAsync(async (req, res) => {
  const { username } = req.session;
  const timerSettings = await TimerService.getSettings(username);
  // if (!timerSettings) {
  //   res.body = ResponseService.newError(
  //     Error.TimerSettingsNotFound.errCode,
  //     Error.TimerSettingsNotFound.errMessage
  //   );
  //   throw ResponseService.newError(
  //     Error.TimerSettingsNotFound.errCode,
  //     Error.TimerSettingsNotFound.errMessage
  //   );
  // }
  res.body = ResponseService.newSucess({ timerSettings });
  res.status(200).json(res.body);
});

const updateSettings = catchAsync(async (req, res) => {
  const { username } = req.session;
  const { timerSettings } = req.body;
  if (!timerSettings) {
    res.body = ResponseService.newError(
      Error.EmptyTimerSettings.errCode,
      Error.EmptyTimerSettings.errMessage
    );
    throw ResponseService.newError(
      Error.EmptyTimerSettings.errCode,
      Error.EmptyTimerSettings.errMessage
    );
  }
  await TimerService.updateSettings(username, timerSettings);

  res.body = ResponseService.newSucess();
  res.status(200).json(res.body);
});

module.exports = { getSettings, updateSettings };
