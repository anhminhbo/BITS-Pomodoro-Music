const mongoose = require("mongoose");
const { MONGO_URL, NODE_ENV } = require("./constant/Env");
//connect mongoose
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecting to Mongoose successfully"))
  .catch((err) => console.error(`Mongo Error: connect:::`, err));

// // all executed methods log output to console
// mongoose.set("debug", NODE_ENV === "development");

// // enabled colors in debug mode
// mongoose.set("debug", { color: NODE_ENV === "development" });

// // get mongodb-shell friendly output (ISODate)
// mongoose.set("debug", { shell: NODE_ENV === "development" });

module.exports = mongoose;
