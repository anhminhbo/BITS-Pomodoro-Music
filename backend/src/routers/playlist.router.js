const express = require("express");
const { PlaylistController } = require("../controllers");
const { useCache, isAuthenticated } = require("../middlewares");

const router = express.Router();

router
  .route("/getPlaylist")
  .get(isAuthenticated, useCache, PlaylistController.getPlaylist);

router
  .route("/updatePlaylist")
  .put(isAuthenticated, PlaylistController.updatePlaylist);

router
  .route("/deleteSong/:songId")
  .delete(isAuthenticated, PlaylistController.deleteSong);

module.exports = router;
 