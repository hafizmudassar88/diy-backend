const TemplateService = require("../services/templateService");

class TemplateController {
  static async createTemplate(req, res, next) {
    try {
      const result = await TemplateService.createTemplate(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getTemplate(req, res, next) {
    try {
      const result = await TemplateService.getTemplate(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getTemplatesOfMine(req, res, next) {
    try {
      const result = await TemplateService.getTemplatesOfMine(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateTemplate(req, res, next) {
    try {
      const result = await TemplateService.updateTemplate(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTemplate(req, res, next) {
    try {
      const result = await TemplateService.deleteTemplate(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TemplateController;
