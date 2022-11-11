const { SESSION_SECRET, NODE_ENV } = require("./constant/Env");

const sessionConfig = {
  secret: SESSION_SECRET,
  cookie: {
    // enable cookies over https
    secure: NODE_ENV === "production" ? true : false,

    // enable to save session to Store
    resave: false,

    // The new session to save to store
    saveUnitialized: false,

    // enable not access by document.cookie from client
    httpOnly: true,

    maxAge: 2 * 60 * 60000, // 2 hours expiration
  },
};

module.exports = sessionConfig;
