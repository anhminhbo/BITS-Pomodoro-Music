const express = require("express");
const { UserController } = require("../controllers");
const { useCache } = require("../middlewares");

const router = express.Router();

router.route("/getUser/:userId").post(useCache, UserController.getUserById);
router.route("/createNewUser").post(UserController.createNewUser);

module.exports = router;
