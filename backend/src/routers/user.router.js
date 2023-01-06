const express = require("express");
const { UserController } = require("../controllers");
const { isAuthenticated } = require("../middlewares");

const router = express.Router();

router.route("/getUsername").get(isAuthenticated, UserController.getUsername);

// router.route("/createNewUser").post(UserController.createNewUser);

module.exports = router;
