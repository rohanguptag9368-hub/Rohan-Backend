const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getDashboardStats,
} = require("../controller/productController");

const {
  protect,
  seller,
} = require("../middleware/authMiddleware");


// ================= PUBLIC ROUTES =================

// Get All Products
router.get("/", getProducts);

// Seller's Own Products
router.get(
  "/my-products",
  protect,
  seller,
  getMyProducts
);

// Seller Dashboard Stats
router.get(
  "/dashboard-stats",
  protect,
  seller,
  getDashboardStats
);

// Get Single Product
// ⚠️ IMPORTANT: Keep this AFTER all custom GET routes
router.get("/:id", getProductById);


// ================= SELLER ROUTES =================

// Add Product
router.post(
  "/",
  protect,
  seller,
  addProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  seller,
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  seller,
  deleteProduct
);

module.exports = router;