const { UserModel } = require("../../models");

const createUser = async (username, password) => {
  const userToBeCreate = new UserModel({
    username,
    password,
  });

  const user = await userToBeCreate.save();
  return user;
};

const getUserById = async (userId) => {
  const user = await UserModel.findById(userId);

  return { user };
};

const getUserByUsername = async (username) => {
  const user = await UserModel.findOne({ username });

  return user;
};

module.exports = { getUserById, createUser, getUserByUsername };
