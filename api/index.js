// const express = require("express");
// const cors = require("cors");
// const routes = require("./routes");
// const errorHandler = require("./middleware/errorHandler");
// const { PORT } = require("./config/environment");
// const connectDB = require("./config/dbconnection");

// const app = express();

// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// app.use(express.json());

// app.use(routes);
// app.use(errorHandler);

// app.get("/", (req, res) => res.send("Express on Vercel"));

// // Start the server and connect to the database
// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//     process.exit(1);
//   }
// };

// startServer();

// module.exports = app;

// //
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const { PORT } = require("./config/environment");
const connectDB = require("./config/dbconnection");

const app = express();

// Allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: false, // Set to true if using cookies or authorization headers
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Express on Vercel"));

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
