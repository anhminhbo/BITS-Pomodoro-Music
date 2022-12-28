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
        default: 25
      },
      breakLength: {
        type: Number,
        default: 5
      },
      isNotified: {
        type: Boolean,
        default: false
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
        index: { type: String, required: true },
        name: { type: String, required: true },
        isDone: { type: Boolean },
      },
    ],
  },
  { minimize: false }
);
// Set default timer settings for user
 userSchema.pre('save', function(next) {
    if (this.timerSettings === null) {
        this.timerSettings.focusLength = 25;
        this.timerSettings.breakLength = 5;
        this.timerSettings.isNotified = false;
    }

    next();
});


module.exports = mongoose.model("User", userSchema);
