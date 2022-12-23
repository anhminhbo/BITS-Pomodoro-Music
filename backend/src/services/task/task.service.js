const { UserModel } = require("../../models");
const UserService = require("../user/user.service");
const RedisService = require("../redis/redis.service");
const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");

const getTasks = async (username) => {
  // Get playlist
  const user = await UserService.getUserByUsername(username);

  const { playlist, timerSettings, tasks } = user;

  //  Handle to cached user playlist and timerSettings and tasks
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    playlist,
    timerSettings,
    tasks,
  });

  return tasks;
};

const updateTask = async (username, task) => {
  // Get playlist
  const user = await UserService.getUserByUsername(username);

  const { tasks } = user;

  const newTasks = tasks.length === 0 ? [task] : [...tasks, task];

  const filter = { username };
  const update = { tasks: newTasks };

  // Get new playlist after update
  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  //  Handle to cached user new playlist
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    tasks: newTasks,
  });

  return;
};

const deleteTask = async (username, taskIndex) => {
  // Get playlist
  const user = await UserService.getUserByUsername(username);

  const { tasks } = user;

  // Check if deletedSong exists
  const isDeletedTaskExists = tasks.some((task) => task.index === taskIndex);
  if (!isDeletedTaskExists) {
    throw ResponseService.newError(
      Error.DeletedTaskNotExists.errCode,
      Error.DeletedTaskNotExists.errMessage
    );
  }

  // Filter playlist to exclude the deletedSong
  const newTasks = tasks.filter((task) => task.index !== taskIndex);

  const filter = { username };
  const update = { tasks: newTasks };

  // Get new playlist after update
  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  //  Handle to cached user new playlist
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    tasks: newTasks,
  });

  return;
};

module.exports = { getTasks, updateTask, deleteTask };
