const jwt = require("jsonwebtoken");

// Verify Token
exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// Verify Seller or Founder
exports.seller = (req, res, next) => {
  if (
    req.user.role !== "seller" &&
    req.user.role !== "founder"
  ) {
    return res.status(403).json({
      success: false,
      message: "Seller Access Only",
    });
  }

  next();
};