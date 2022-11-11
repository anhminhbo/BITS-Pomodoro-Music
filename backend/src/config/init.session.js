const { SESSION_SECRET, NODE_ENV } = require("./constant/Env");

const sessionConfig = {
  secret: SESSION_SECRET,
  cookie: {
    // enable cookies over https
    secure: NODE_ENV === "production",

    // enable to save session to Store
    resave: false,

    // trust the nginx proxy in front of express
    proxy: NODE_ENV === "production",

    // // Make this none to testing from local call to production
    // sameSite: 'none',

    // The new session to save to store
    saveUnitialized: false,

    // enable not access by document.cookie from client
    httpOnly: true,

    maxAge: 2 * 60 * 60000, // 2 hours expiration
    
  },
};

module.exports = sessionConfig;
