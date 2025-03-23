const express = require("express");
const templateController = require("../controllers/templateController");
const authMiddleware = require("../middleware/authMiddleware");
const apiLimiter = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/create", authMiddleware, apiLimiter, templateController.createTemplate);
router.get("/mine", authMiddleware, templateController.getTemplatesOfMine);
router.get("/all-sorted", authMiddleware, templateController.getAllTemplatesSorted);
router.put("/update", authMiddleware, apiLimiter, templateController.updateTemplate);
router.put("/update/status", authMiddleware, apiLimiter, templateController.updateTemplateStatus);
router.delete("/delete", authMiddleware, apiLimiter, templateController.deleteTemplate);
router.get("/user/:userId", templateController.getTemplatesByUserId);
router.get("/:templateId", templateController.getTemplate);

// Blog Routes
router.post("/:templateId/blog/add", authMiddleware, templateController.addBlog);
router.put("/:templateId/blog/update", authMiddleware, templateController.updateBlog);
router.delete("/:templateId/blog/delete", authMiddleware, templateController.deleteBlog);

// Research Routes
router.post("/:templateId/research/add", authMiddleware, templateController.addResearch);
router.put("/:templateId/research/update", authMiddleware, templateController.updateResearch);
router.delete("/:templateId/research/delete", authMiddleware, templateController.deleteResearch);

module.exports = router;
