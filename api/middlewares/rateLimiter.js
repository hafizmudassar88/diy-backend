const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
  headers: true,
  keyGenerator: (req) => req.ip,
});

module.exports = apiLimiter;
