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

}

module.exports = UserController;
