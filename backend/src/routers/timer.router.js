const express = require("express");
const { TimerController } = require("../controllers");
const { useCache, isAuthenticated } = require("../middlewares");

const router = express.Router();

router
  .route("/getSettings")
  .get(isAuthenticated, useCache, TimerController.getSettings);

router
  .route("/updateSettings")
  .put(isAuthenticated, TimerController.updateSettings);

module.exports = router;
