const Order = require("../models/temp");
const Product = require("../models/temp2");

// ================= Create Order =================
const createOrder = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    const order = await Order.create({
      customer: req.user.id,

      seller: product.sellerId,

      product: product._id,

      productName: product.name,

      productImage: product.image,

      price: product.price,

      quantity,

      totalPrice: product.price * quantity,

      shippingAddress,

      paymentMethod,
    });

    // Reduce Stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Customer Orders =================
const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      customer: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Seller Orders =================
const getSellerOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      seller: req.user.id,
    })
      .populate("customer", "name email")
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Status =================
const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Updated Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Seller Earnings =================
const getEarnings = async (req, res) => {
  try {

    const deliveredOrders = await Order.find({
      seller: req.user.id,
      status: "Delivered",
    });

    const totalOrders = deliveredOrders.length;

    const totalEarnings = deliveredOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      earnings: {
        totalOrders,
        totalEarnings,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  getEarnings,
};