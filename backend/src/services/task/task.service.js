const { UserModel } = require("../../models");
const UserService = require("../user/user.service");
const RedisService = require("../redis/redis.service");
const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");

const getTasks = async (username) => {
  // Get task
  const user = await UserService.getUserByUsername(username);

  const { task, timerSettings, tasks } = user;

  //  Handle to cached user task and timerSettings and tasks
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    task,
    timerSettings,
    tasks,
  });

  return tasks;
};

const updateTask = async (username, task) => {
  // Get task
  const user = await UserService.getUserByUsername(username);

  const { tasks } = user;

  // Handle when task is new or just updated
  const isNeedUpdate = tasks.some(
    (t, index) => index == task.index && t.isDone != task.isDone
  );

  let newTasks;
  if (isNeedUpdate) {
    if (tasks.length !== 0) tasks[task.index] = task;
    newTasks = tasks;
  } else {
    newTasks = tasks.length === 0 ? [task] : [...tasks, task];
  }

  const filter = { username };
  const update = { tasks: newTasks };

  // Get new task after update
  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  //  Handle to cached user new task
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    tasks: newTasks,
  });

  return;
};

const deleteTask = async (username, taskIndex) => {
  // Get task
  const user = await UserService.getUserByUsername(username);

  const { tasks } = user;

  // Check if deletedSong exists
  const isDeletedTaskExists = tasks.some((task, index) => index == taskIndex);
  if (!isDeletedTaskExists) {
    throw ResponseService.newError(
      Error.DeletedTaskNotExists.errCode,
      Error.DeletedTaskNotExists.errMessage
    );
  }

  // Filter task to exclude the deletedSong
  const newTasks = tasks.filter((task, index) => index != taskIndex);

  const filter = { username };
  const update = { tasks: newTasks };

  // Get new task after update
  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  //  Handle to cached user new task
  const cachedData = await RedisService.getValue(username);
  await RedisService.setValue(username, {
    ...cachedData,
    tasks: newTasks,
  });

  return;
};

module.exports = { getTasks, updateTask, deleteTask };
