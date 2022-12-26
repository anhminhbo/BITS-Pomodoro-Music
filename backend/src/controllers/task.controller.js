const { ResponseService, TaskService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getTasks = catchAsync(async (req, res) => {
  const { username } = req.session;
  const tasks = await TaskService.getTasks(username);
  //   if (tasks.length === 0) {
  //     res.body = {
  //       errCode: Error.EmptyTask.errCode,
  //       errMessage: Error.EmptyTask.errMessage,
  //     };
  //     throw ResponseService.newError(
  //       Error.EmptyTask.errCode,
  //       Error.EmptyTask.errMessage
  //     );
  //   }

  res.body = ResponseService.newSucess({ tasks });
  res.status(200).json(res.body);
});

const updateTask = catchAsync(async (req, res) => {
  const { username } = req.session;
  const { task } = req.body;
  if (!task.name) {
    res.body = {
      errCode: Error.EmptyTask.errCode,
      errMessage: Error.EmptyTask.errMessage,
    };
    throw ResponseService.newError(
      Error.EmptyTask.errCode,
      Error.EmptyTask.errMessage
    );
  }
  await TaskService.updateTask(username, task);

  res.body = ResponseService.newSucess();
  res.status(200).json(res.body);
});

const deleteTask = catchAsync(async (req, res) => {
  const { username } = req.session;

  const taskIndex = req.params.taskIndex;

  if (!taskIndex) {
    res.body = {
      errCode: Error.EmptyTaskIndex.errCode,
      errMessage: Error.EmptyTaskIndex.errMessage,
    };
    throw ResponseService.newError(
      Error.EmptyTaskIndex.errCode,
      Error.EmptyTaskIndex.errMessage
    );
  }

  await TaskService.deleteTask(username, taskIndex);

  res.body = ResponseService.newSucess();
  res.status(200).json(res.body);
});

module.exports = { getTasks, updateTask, deleteTask };
