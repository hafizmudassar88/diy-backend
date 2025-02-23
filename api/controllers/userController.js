const UserService = require("../services/userService");

class UserController {
  static async getPlatformUsers(req, res, next) {
    try {
      const result = await UserService.getPlatformUsers(req);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
  static async deletePlatformUser(req, res, next) {
    try {
      const result = await UserService.deletePlatformUser(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async getAdminDashboardUsers(req, res, next) {
    try {
      const result = await UserService.getAdminDashboardUsers();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateDashboardUser(req, res, next) {
    try {
      const { id } = req.params;
      const { username, password, role, email } = req.body;

      const result = await UserService.updateDashboardUser(id, { username, password, role, email });

      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated successfully", user: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
