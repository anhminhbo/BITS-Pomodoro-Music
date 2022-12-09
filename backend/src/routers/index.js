// Router is responsible for routing URL endpoint to specific controller
// responsible for the requested action
// also the place where Browser will send request to first
const UserRouter = require("./user.router");
const AuthRouter = require("./auth.router");
const PlaylistRouter = require("./playlist.router");
const TimerRouter = require("./timer.router");

module.exports = { UserRouter, AuthRouter, PlaylistRouter, TimerRouter };
