// Services layer responsible for business logic of the application
// For example query db, handle complex business logic like validation,...
const ResponseService = require("./response/response.service");
const RedisService = require("./redis/redis.service");
const UserService = require("./user/user.service");
const AuthService = require("./auth/auth.service");
const PlaylistService = require("./playlist/playlist.service");
const TimerService = require("./timer/timer.service");

module.exports = {
  ResponseService,
  UserService,
  AuthService,
  RedisService,
  PlaylistService,
  TimerService,
};
