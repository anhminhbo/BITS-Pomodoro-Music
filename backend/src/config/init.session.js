const { SESSION_SECRET, NODE_ENV, MONGO_URL } = require("./constant/Env");
const MongoStore = require("connect-mongo");
const sessionConfig = {
  secret: SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    autoRemove: 'interval',
    autoRemoveInterval: 1 // In minutes. Default
  }),
  cookie: {
    // enable cookies over https
    secure: NODE_ENV === "production",

    // enable to save session to Store,// don't create session until something stored
    resave: false,

    // trust the nginx proxy in front of express
    proxy: NODE_ENV === "production",

    // // Make this none to testing from local call to production
    // sameSite: 'none',

    // The new session to save to store, //don't save session if unmodified
    saveUnitialized: false,

    // enable not access by document.cookie from client
    httpOnly: true,

    maxAge: 2 * 60 * 60000, // 2 hours expiration
  },
};

module.exports = sessionConfig;
