const mongoose = require("mongoose");
const { MONGO_URL } = require("./constant/Env");
//connect mongoose
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecting to Mongoose successfully"))
  .catch((err) => console.error(`Mongo Error: connect:::`, err));

// all executed methods log output to console
mongoose.set("debug", true);

// disable colors in debug mode
mongoose.set("debug", { color: false });

// get mongodb-shell friendly output (ISODate)
mongoose.set("debug", { shell: true });

module.exports = mongoose;
