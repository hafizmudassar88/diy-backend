const { default: mongoose } = require("mongoose");
const User = require("../schema/user.schema");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

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

async function updateDashboardUser(userId, updateData) {
  const { username, password, role, email } = updateData;

  // Prepare update object
  const updateFields = {};
  if (username) updateFields.username = username;
  if (email) updateFields.email = email;
  if (role) updateFields.role = role;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(password, salt); // Hash password before storing
  }

  // Find and update the user
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, is_dashboard_user: true }, // Only allow updates for dashboard users
    { $set: updateFields },
    { new: true, select: "-password -googleId" } // Exclude sensitive fields
  );

  return updatedUser;
}

async function deleteDashboardUser(userId) {
  const result = await User.findOneAndDelete({
    _id: userId,
    is_dashboard_user: true, // Ensure only dashboard users can be deleted
  });

  return result;
}
async function createDashboardUser(userData) {
  const { username, password, role, email, name } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error("Username or email already exists");
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const newUser = new User({
    username,
    password: hashedPassword,
    role,
    email,
    name,
    is_dashboard_user: true, // Set it as a dashboard user
  });

  await newUser.save();
  return newUser;
}

module.exports = {
  createDashboardUser,
  getPlatformUsers,
  deletePlatformUser,
  getAdminDashboardUsers,
  updateDashboardUser,
  deleteDashboardUser,
};
