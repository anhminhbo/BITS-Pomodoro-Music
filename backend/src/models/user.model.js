const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    timerSettings: {
      focusLength: {
        type: Number,
      },
      breakLength: {
        type: Number,
      },
      isNotified: {
        type: Boolean,
      },
    },
    playlist: [
      {
        songChannelTitle: { type: String },
        songDuration: {
          hour: { type: String },
          min: { type: String },
          sec: { type: String },
        },
        songId: { type: String },
        songTitle: { type: String },
        songUrl: { type: String },
      },
    ],
    tasks: [
      {
        index: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        isDone: { type: Boolean },
      },
    ],
  },
  { minimize: false }
);

module.exports = mongoose.model("User", userSchema);
