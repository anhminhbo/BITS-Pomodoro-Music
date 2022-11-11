const { ResponseService, UserService, AuthService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const register = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const userFromDb = await UserService.getUserByUsername(username);
  if (userFromDb) {
    throw ResponseService.newError(
      Error.UserAlreadyExists.errCode,
      Error.UserAlreadyExists.errMessage
    );
  }

  const user = await AuthService.register(username, password);

  res.status(200).json(ResponseService.newSucess(user));
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  await AuthService.login(username, password);
  req.session.username = username;

  res.status(200).json(ResponseService.newSucess());
});

const logout = catchAsync(async (req, res) => {
  await req.session.destroy();
  res.status(200).json(ResponseService.newSucess());
});

module.exports = { login, logout, register };
