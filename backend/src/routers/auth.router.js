const express = require("express");
const { AuthController } = require("../controllers");
const { isAuthenticated } = require("../middlewares");

const router = express.Router();

router.route("/register").post(AuthController.register);

router.route("/login").post(AuthController.login);

router.route("/logout").get(isAuthenticated, AuthController.logout);

router
  .route("/changePassword")
  .put(isAuthenticated, AuthController.changePassword);

module.exports = router;
