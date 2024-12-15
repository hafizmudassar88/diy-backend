const express = require("express");
const authRoutes = require("./authRoutes");
const templateRoutes = require("./templateRoutes");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/template", templateRoutes);

module.exports = router;
