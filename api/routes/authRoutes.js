const express = require("express");
const AuthController = require("../controllers/authController");
const apiLimiter = require("../middlewares/rateLimiter");
// const { default: rateLimit } = require("express-rate-limit");

const router = express.Router();

router.post("/signup", apiLimiter, AuthController.signUpUser);
router.post("/login", apiLimiter, AuthController.loginUser);
router.post("/google-login", apiLimiter, AuthController.googleLoginUser);
router.post("/verify-token", AuthController.verifyToken);
router.post("/reset-password-request", AuthController.resetPasswordRequest);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
