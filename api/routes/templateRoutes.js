const express = require("express");
const templateController = require("../controllers/templateController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, templateController.createTemplate);
router.get("/mine", authMiddleware, templateController.getTemplatesOfMine);
router.put("/update", authMiddleware, templateController.updateTemplate);
router.delete("/delete", authMiddleware, templateController.deleteTemplate);
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
