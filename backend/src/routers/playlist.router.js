const express = require("express");
const { PlaylistController } = require("../controllers");
const { useCache, isAuthenticated } = require("../middlewares");

const router = express.Router();

router
  .route("/getPlaylist")
  .get(isAuthenticated, useCache, PlaylistController.getPlaylist);

router
  .route("/updatePlaylist")
  .post(isAuthenticated, PlaylistController.updatePlaylist);

router
  .route("/deleteSong")
  .post(isAuthenticated, PlaylistController.deleteSong);

module.exports = router;
