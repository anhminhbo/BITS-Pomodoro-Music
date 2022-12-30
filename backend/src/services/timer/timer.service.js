const { UserModel } = require("../../models");
const UserService = require("../user/user.service");
const RedisService = require("../redis/redis.service");

const getSettings = async (username) => {
  const user = await UserService.getUserByUsername(username);

  const { timerSettings, playlist, tasks } = user;

  //  Handle to cached user timer settings and playlist
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    timerSettings,
    playlist,
    tasks,
  });

  return timerSettings;
};

const updateSettings = async (username, reqTimerSettings) => {
  // Get timerSettings
  const user = await UserService.getUserByUsername(username);

  // Handle to check if any value changed to set new settings

  const newTimerSettings = JSON.parse(JSON.stringify(reqTimerSettings));

  if (!newTimerSettings.focusLength)
    newTimerSettings.focusLength = user.timerSettings.focusLength;
  if (!newTimerSettings.breakLength)
    newTimerSettings.breakLength = user.timerSettings.breakLength;

  const filter = { username };
  const update = { timerSettings: newTimerSettings };

  // Get timer settings after update
  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  //  Handle to cached user new timer settings
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    timerSettings: newTimerSettings,
  });

  return;
};

module.exports = { getSettings, updateSettings };
