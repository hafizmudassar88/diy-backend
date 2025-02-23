const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schema/user.schema");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const { AES, enc, mode, pad } = require("crypto-js");
const { GOOGLE_CLIENT_ID } = require("../config/environment");

const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

async function signUp(req) {
  const { username, name, email, password, role } = req.body;
  let isDashboardUser = false;
  let userRole = "USER";

  // Check if admin or super admin is trying to register as dashboard user
  if ((role && role === "ADMIN") || role === "SUPER_ADMIN") {
    isDashboardUser = true;
    userRole = role;
  }
  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error("User with this email or username already exists.");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    name,
    email,
    password: hashedPassword,
    role: userRole,
    is_dashboard_user: isDashboardUser,
  });
  await newUser.save();

  return { message: "User registered successfully." };
}

async function login(req) {
  const { identifier, password } = req.body; // Identifier could be email or username
  const isEmail = (identifier) => /\S+@\S+\.\S+/.test(identifier);

  let user;

  // Check if the identifier is an email
  if (isEmail(identifier)) {
    user = await User.findOne({ email: identifier });
  } else {
    user = await User.findOne({ username: identifier });
  }

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

async function googleLogin(req) {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);

  const { token } = req.body;

  // Verify the ID token with Google
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { sub: googleId, email, name } = payload;

  // Check if a user with this Google ID or email already exists
  let user = await User.findOne({ $or: [{ googleId }, { email }] });

  // If user does not exist, create a new user
  if (!user) {
    const password = crypto.randomBytes(8).toString("hex");
    user = new User({
      username: email.split("@")[0],
      name,
      email,
      password,
      googleId,
    });
    await user.save();
  }

  const jwtToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  return {
    token: jwtToken,
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

async function verifyToken(req) {
  const { token } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  const user = await User.findOne({ username: decoded.username }, "-password");
  if (!user) throw new Error("user not found");

  return { user, token };
}

function encrypt(text) {
  const iv = enc.Hex.parse("00000000000000000000000000000000");
  return AES.encrypt(text, process.env.JWT_SECRET, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
}

async function resetPasswordRequest(req) {}

function decrypt(encrypted) {
  const iv = enc.Hex.parse("00000000000000000000000000000000");
  return AES.decrypt(encrypted, process.env.JWT_SECRET, {
    iv: iv,
    mode: mode.CBC,
    padding: pad.Pkcs7,
  });
}
async function resetPassword(req) {
  const { token, newPassword } = req.body;
  const username = decrypt(token).toString(enc.Utf8);

  let user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  const password = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        password: password,
      },
    }
  );

  return { message: "Password reset successfully" };
}

module.exports = {
  signUp,
  login,
  googleLogin,
  verifyToken,
  resetPasswordRequest,
  resetPassword,
};
