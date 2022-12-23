const express = require("express");
const { TaskController } = require("../controllers");
const { useCache, isAuthenticated } = require("../middlewares");

const router = express.Router();

router
  .route("/getTasks")
  .get(isAuthenticated, useCache, TaskController.getTasks);

router
  .route("/updateTask")
  .put(isAuthenticated, TaskController.updateTask);

router
  .route("/deleteTask/:taskIndex")
  .delete(isAuthenticated, TaskController.deleteTask);

module.exports = router;
 