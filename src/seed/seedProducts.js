require("dotenv").config();

const connectDB = require("../config/db");
const Product = require("../models/product");

const sellerId = "6a49e3796d819d5754274746";
const sellerName = "Gupta";
const products = [
  // ================= SANITARY =================
  {
    sellerId,
    sellerName,
    name: "Luxury Sanitary Collection",
    category: "Sanitary",
    price: 54999,
    image: "http://localhost:5000/images/fullSanitarykit.jpg",
    description: "Complete luxury sanitary collection for premium bathrooms.",
    stock: 12,
  },
  {
    sellerId,
    sellerName,
    name: "Premium Rain Shower Panel",
    category: "Sanitary",
    price: 18999,
    image: "http://localhost:5000/images/eliteshower.jpg",
    description: "Premium rainfall shower panel with modern finish.",
    stock: 18,
  },
  {
    sellerId,
    sellerName,
    name: "Designer Bathroom Accessories",
    category: "Sanitary",
    price: 15999,
    image: "http://localhost:5000/images/fullSanitarykit.jpg",
    description: "Luxury designer bathroom accessory collection.",
    stock: 20,
  },
  {
    sellerId,
    sellerName,
    name: "Modern Washroom Essentials",
    category: "Sanitary",
    price: 22999,
    image: "http://localhost:5000/images/fullSanitarykit.jpg",
    description: "Modern premium washroom essentials.",
    stock: 15,
  },

  // ================= KITCHEN =================
  {
    sellerId,
    sellerName,
    name: "Premium 4 Burner Glass Gas Stove",
    category: "Kitchen",
    price: 18499,
    image: "http://localhost:5000/images/4 burnergas.jpg",
    description: "Premium 4 burner toughened glass gas stove.",
    stock: 10,
  },
  {
    sellerId,
    sellerName,
    name: "Luxury Stainless Steel Cookware Set",
    category: "Kitchen",
    price: 12499,
    image: "http://localhost:5000/images/kitchen.jpg",
    description: "Luxury stainless steel cookware set.",
    stock: 14,
  },
  {
    sellerId,
    sellerName,
    name: "Premium Steel Cookware Collection",
    category: "Kitchen",
    price: 10999,
    image: "http://localhost:5000/images/kitchen2.jpg",
    description: "Premium steel cookware collection.",
    stock: 16,
  },
  {
    sellerId,
    sellerName,
    name: "Professional Cooking Set",
    category: "Kitchen",
    price: 15999,
    image: "http://localhost:5000/images/kitchen4.jpg",
    description: "Professional cooking cookware set.",
    stock: 9,
  },

  // ================= HOUSEWARE =================
  {
    sellerId,
    sellerName,
    name: "Luxury Ceramic Dinner Set",
    category: "Houseware",
    price: 8999,
    image: "http://localhost:5000/images/dinner set20.jpg",
    description: "Luxury ceramic dinner set.",
    stock: 18,
  },
  {
    sellerId,
    sellerName,
    name: "Premium Dining Collection",
    category: "Houseware",
    price: 18999,
    image: "http://localhost:5000/images/fulldinninset.jpg",
    description: "Premium dining collection.",
    stock: 8,
  },
  {
    sellerId,
    sellerName,
    name: "Designer Ceramic Bowl Set",
    category: "Houseware",
    price: 6999,
    image: "http://localhost:5000/images/caffene ceramic.jpg",
    description: "Designer ceramic bowl set.",
    stock: 22,
  },
  {
    sellerId,
    sellerName,
    name: "Olive Blackout Curtains",
    category: "Houseware",
    price: 3499,
    image: "http://localhost:5000/images/curtain.jpg",
    description: "Premium olive blackout curtains.",
    stock: 25,
  },

  // ================= HARDWARE =================
  {
    sellerId,
    sellerName,
    name: "Luxury Brass Door Handle",
    category: "Hardware",
    price: 2999,
    image: "http://localhost:5000/images/4 inch pull handle.jpg",
    description: "Luxury brass pull handle.",
    stock: 40,
  },
  {
    sellerId,
    sellerName,
    name: "Premium 4 Feet Pull Handle",
    category: "Hardware",
    price: 7999,
    image: "http://localhost:5000/images/4feetdoorhandle.jpg",
    description: "Premium stainless steel 4 feet pull handle.",
    stock: 15,
  },
  {
    sellerId,
    sellerName,
    name: "Elephant Designer Door Handle",
    category: "Hardware",
    price: 4999,
    image: "http://localhost:5000/images/elephantdesignpremiumhandle.jpg",
    description: "Elephant designer premium door handle.",
    stock: 20,
  },
  {
    sellerId,
    sellerName,
    name: "Butterfly Wall Hook",
    category: "Hardware",
    price: 999,
    image: "http://localhost:5000/images/butterflywallmountedhook.jpg",
    description: "Premium butterfly wall mounted hook.",
    stock: 45,
  },
  {
    sellerId,
    sellerName,
    name: "Premium Door Lock Collection",
    category: "Hardware",
    price: 4499,
    image: "http://localhost:5000/images/hardware.jpg",
    description: "Premium security door locks.",
    stock: 18,
  },
  {
    sellerId,
    sellerName,
    name: "Luxury Door Hardware Set",
    category: "Hardware",
    price: 5999,
    image: "http://localhost:5000/images/hardwareproduct.jpg",
    description: "Luxury complete door hardware set.",
    stock: 16,
  },
  {
    sellerId,
    sellerName,
    name: "Professional Tool Kit",
    category: "Hardware",
    price: 9499,
    image: "http://localhost:5000/images/harwarekit.jpg",
    description: "Professional toolkit for technicians.",
    stock: 12,
  },
  {
    sellerId,
    sellerName,
    name: "Industrial Repair Tool Set",
    category: "Hardware",
    price: 12999,
    image: "http://localhost:5000/images/harwarekit.jpg",
    description: "Industrial grade repair tool set.",
    stock: 10,
  },
];



const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Old products deleted");
    console.log("✅ New products imported");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();