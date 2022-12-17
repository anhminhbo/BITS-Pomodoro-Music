const UserService = require("../user/user.service");
const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");
const bcrypt = require("bcrypt");

const register = async (username, password) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserService.createUser(username, hashedPassword);

  return;
};

const login = async (username, password) => {
  const user = await UserService.getUserByUsername(username);
  if (!user) {
    throw ResponseService.newError(
      Error.UserNotFound.errCode,
      Error.UserNotFound.errMessage
    );
  }

  // check user password with hashed password stored in the database
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw ResponseService.newError(
      Error.PasswordInvalid.errCode,
      Error.PasswordInvalid.errMessage
    );
  }

  return user;
};

module.exports = { register, login };
