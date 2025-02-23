const { default: mongoose } = require("mongoose");
const User = require("../schema/user.schema");

async function getPlatformUsers(req) {
  const users = await User.find({
    is_dashboard_user: false,
  }).select({ password: 0, googleId: 0 });
  return users;
}

async function deletePlatformUser(userId) {
  const result = await User.findOneAndDelete({
    _id: userId,
    is_dashboard_user: false,
  });
  return result;
}

async function getAdminDashboardUsers() {
  const users = await User.find({
    is_dashboard_user: true,
  }).select({ password: 0, googleId: 0 });
  return users;
}
module.exports = {
  getPlatformUsers,
  deletePlatformUser,
  getAdminDashboardUsers,
};
