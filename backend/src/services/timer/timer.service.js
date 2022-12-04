const { UserModel } = require("../../models");
const UserService = require("../user/user.service");
const RedisService = require("../redis/redis.service");

const getSettings = async (username) => {
  // Get playlist
  const user = await UserService.getUserByUsername(username);

  const { timerSettings, playlist } = user;

  //  Handle to cached user timer settings and playlist
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    timerSettings,
    playlist,
  });

  return timerSettings;
};

const updateSettings = async (username, newTimerSettings) => {
  // Get playlist

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
