const express = require("express");
const router = express.Router();

const middleware = require("../middleware/authMiddleware");

console.log(middleware);

router.get("/dashboard", (req, res) => {
  res.json({ success: true });
});

module.exports = router;