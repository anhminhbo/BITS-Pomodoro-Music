const { ResponseService, UserService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await UserService.getUserById(userId);
  if (!user) {
    throw ResponseService.newError(
      Error.UserNotFound.errCode,
      Error.UserNotFound.errMessage
    );
  }
  res.status(200).json(ResponseService.newSucess(user));
});

const createNewUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await UserService.getUserByUsername(username);
  if (user) {
    throw ResponseService.newError(
      Error.UserAlreadyExists.errCode,
      Error.UserAlreadyExists.errMessage
    );
  }
  const newUser = await UserService.createUser(username, password);
  res.status(200).json(ResponseService.newSucess(newUser));
});

module.exports = { getUserById, createNewUser };
