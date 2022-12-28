const { ResponseService, UserService, AuthService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const register = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const userFromDb = await UserService.getUserByUsername(username);
  if (userFromDb) {
    res.body = {
      errCode: Error.UserAlreadyExists.errCode,
      errMessage: Error.UserAlreadyExists.errMessage,
    };
    throw ResponseService.newError(
      Error.UserAlreadyExists.errCode,
      Error.UserAlreadyExists.errMessage
    );
  }

  await AuthService.register(username, password);

  res.body = ResponseService.newSucess();
  res.status(200).json(res.body);
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await AuthService.login(username, password);
  req.session.username = username;

  res.body = ResponseService.newSucess(user);
  res.status(200).json(res.body);
});

const logout = catchAsync(async (req, res) => {
  await req.session.destroy();
  res.body = ResponseService.newSucess();
  res.status(200).json(res.body);
});

const changePassword = catchAsync(async (req, res) => {
  const { username } = req.session;
  const { oldPassword, newPassword } = req.body;
  await AuthService.changePassword(username, oldPassword, newPassword);

  res.status(200).json(ResponseService.newSucess());
});

module.exports = { login, logout, register, changePassword };
