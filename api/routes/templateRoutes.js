const express = require("express");
const templateController = require("../controllers/templateController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, templateController.createTemplate);
router.get("/mine", authMiddleware, templateController.getTemplatesOfMine);
router.put("/update", authMiddleware, templateController.updateTemplate);
router.delete("/delete", authMiddleware, templateController.deleteTemplate);
router.get("/:templateId", authMiddleware, templateController.getTemplate);

module.exports = router;
