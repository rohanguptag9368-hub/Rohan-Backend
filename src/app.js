
const paymentRoutes = require("./routes/paymentRoutes");
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes.js");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Sanitary Store API Running...");
});

module.exports = app;