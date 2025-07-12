// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/passwordReset", require("./routes/passwordReset"));
app.use("/api", require("./routes/roomrent"));
app.use("/api/room-availability", require("./routes/roomAvailabilityRoute"));
app.use("/api/room-confirmation-tax", require("./routes/roomTax"));
app.use("/api/room-close", require("./routes/roomCloseRoutes"));
app.use("/api/email", require("./routes/email"));
app.use("/api/adminemail", require("./routes/Adminrommemail"));

// ✅ Optional root route for test
app.get("/", (req, res) => {
  res.send("✅ Backend is running on Vercel");
});

// ✅ Export app for Vercel
module.exports = app;
