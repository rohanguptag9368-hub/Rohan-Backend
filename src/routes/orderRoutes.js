const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  getEarnings,
} = require("../controller/orderController");

const {
  protect,
  seller,
} = require("../middleware/authMiddleware");

// ================= Customer Routes =================

// Place Order
router.post("/", protect, createOrder);

// Customer Orders
router.get("/my-orders", protect, getMyOrders);

// ================= Seller Routes =================

// Seller Orders
router.get(
  "/seller-orders",
  protect,
  seller,
  getSellerOrders
);

// Seller Earnings
router.get(
  "/earnings",
  protect,
  seller,
  getEarnings
);

// Update Order Status
router.put(
  "/:id/status",
  protect,
  seller,
  updateOrderStatus
);

module.exports = router;