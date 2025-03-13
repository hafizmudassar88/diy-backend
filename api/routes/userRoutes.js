const express = require("express");
const UserController = require("../controllers/userController");
const apiLimiter = require("../middlewares/rateLimiter");
const router = express.Router();

router.get("/get-platform-users", apiLimiter, UserController.getPlatformUsers);
router.delete("/delete-platform-user/:id", apiLimiter, UserController.deletePlatformUser);
router.get("/get-admin-dashboard-users", apiLimiter, UserController.getAdminDashboardUsers);
router.put("/update-dashboard-user/:id", apiLimiter, UserController.updateDashboardUser);
router.delete("/delete-dashboard-user/:id", apiLimiter, UserController.deleteDashboardUser);
router.post("/create-dashboard-user", UserController.createDashboardUser);

module.exports = router;
