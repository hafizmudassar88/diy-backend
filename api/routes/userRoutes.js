const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/get-platform-users", UserController.getPlatformUsers);


module.exports = router;
