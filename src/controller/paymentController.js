const createPaymentIntent = async (req, res) => {
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);

  return res.status(200).json({
    success: true,
    body: req.body,
  });
};

module.exports = {
  createPaymentIntent,
};