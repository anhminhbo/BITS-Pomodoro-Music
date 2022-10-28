const express = require("express");
const { UserController } = require("../controllers");

const router = express.Router();

router.route("/getUser/:userId").post(UserController.getUserById);
router.route("/createNewUser").post(UserController.createNewUser);

module.exports = router;
