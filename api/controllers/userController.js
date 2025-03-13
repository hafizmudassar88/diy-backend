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
  static async deleteDashboardUser(req, res, next) {
    try {
      const { id } = req.params;

      const result = await UserService.deleteDashboardUser(id);

      if (!result) {
        return res.status(404).json({ message: "Admin dashboard user not found" });
      }

      res.json({ message: "Admin dashboard user deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async createDashboardUser(req, res, next) {
    try {
      const { username, password, role, email, name } = req.body;

      // Validate required fields
      if (!username || !password || !role || !email || !name) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the role is valid
      const validRoles = ["ADMIN", "SUPER_ADMIN"];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role provided" });
      }

      const result = await UserService.createDashboardUser({
        username,
        password,
        role,
        email,
        name,
      });

      if (!result) {
        return res.status(400).json({ message: "Failed to create user" });
      }

      res.status(201).json({ message: "User created successfully", user: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
