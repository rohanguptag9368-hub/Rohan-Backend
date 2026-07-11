const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

console.log("MONGO_URI =", process.env.MONGO_URI);

// Database Connection
connectDB();

// =======================
// Serve Images
// =======================
app.use(
  "/images",
  express.static(path.join(__dirname, "../images"))
);

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});