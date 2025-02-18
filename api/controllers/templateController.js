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


  static async getTemplatesByUserId(req, res, next) {
    try {
      const result = await TemplateService.getTemplatesByUserId(req);
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
  static async getAllTemplatesSorted(req, res, next) {
    try {
      const result = await TemplateService.getAllTemplatesSorted(req);
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
  static async updateTemplateStatus(req, res, next) {
    try {
      const result = await TemplateService.updateTemplateStatus(req);
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

  // Blogs CRUD
  static async addBlog(req, res, next) {
    try {
      const result = await TemplateService.addBlog(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateBlog(req, res, next) {
    try {
      const result = await TemplateService.updateBlog(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBlog(req, res, next) {
    try {
      const result = await TemplateService.deleteBlog(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  // Researches CRUD
  static async addResearch(req, res, next) {
    try {
      const result = await TemplateService.addResearch(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateResearch(req, res, next) {
    try {
      const result = await TemplateService.updateResearch(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteResearch(req, res, next) {
    try {
      const result = await TemplateService.deleteResearch(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TemplateController;
