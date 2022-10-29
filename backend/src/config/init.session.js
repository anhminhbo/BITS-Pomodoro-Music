const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./init.redis");
const { SESSION_SECRET } = require("./constant/Env");
session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    // enable cookies over https
    secure: false,

    // enable to save session to Store
    resave: false,

    // The new session to save to store
    saveUnitialized: false,

    // enable not access by document.cookie from client
    httpOnly: true,

    maxAge: 2 * 60 * 60000, // 2 hours expiration
  },
});
