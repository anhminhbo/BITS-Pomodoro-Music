const express = require("express");
const { UserController } = require("../controllers");
const { isCaching } = require("../middlewares");

const router = express.Router();

router.route("/getUser/:userId").post(isCaching, UserController.getUserById);
router.route("/createNewUser").post(UserController.createNewUser);

module.exports = router;
