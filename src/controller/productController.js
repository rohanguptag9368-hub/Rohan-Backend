const Product = require("../models/temp2");
const User = require("../models/User");
const Order = require("../models/temp");

// ================= Get All Products =================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Single Product =================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Add Product =================
const addProduct = async (req, res) => {
  try {

    const seller = await User.findById(req.user.id);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    const product = await Product.create({
      sellerId: seller._id,
      sellerName: seller.name,

      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
      stock: req.body.stock,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Product =================
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        sellerId: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= My Products =================
const getMyProducts = async (req, res) => {
  try {

    const products = await Product.find({
      sellerId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Dashboard Stats =================


const getDashboardStats = async (req, res) => {
  try {
    console.log("Logged In Seller:", req.user);
console.log("Seller ID:", req.user.id);

    const totalProducts = await Product.countDocuments({
      sellerId: req.user.id,
    });
    console.log("Total Products:", totalProducts);

    const totalOrders = await Order.countDocuments({
      seller: req.user.id,
    });

    const pendingOrders = await Order.countDocuments({
      seller: req.user.id,
      status: "Pending",
    });

    const deliveredOrders = await Order.find({
      seller: req.user.id,
      status: "Delivered",
    });

    const totalEarnings = deliveredOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      stats: {
        products: totalProducts,
        orders: totalOrders,
        earnings: totalEarnings,
        pending: pendingOrders,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= Delete Product =================
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      sellerId: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getDashboardStats,
};