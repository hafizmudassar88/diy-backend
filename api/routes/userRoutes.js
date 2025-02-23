const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/get-platform-users", UserController.getPlatformUsers);
router.delete("/delete-platform-user/:id", UserController.deletePlatformUser);
router.get("/get-admin-dashboard-users", UserController.getAdminDashboardUsers);
router.put("/update-dashboard-user/:id", UserController.updateDashboardUser);

module.exports = router;
