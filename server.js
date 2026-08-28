// Eco-Cart Micro-SaaS Backend
// Node.js Express server for the Eco-Cart application

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app (build output)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Eco-Cart API is running' });
});

// Mock product data API
app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Reusable Water Bottle', price: 14.20 },
    { id: 2, name: 'Organic Cotton T-Shirt', price: 22.50 },
    { id: 3, name: 'Bamboo Cutting Board', price: 32.00 },
    { id: 4, name: 'Glass Food Storage Set', price: 28.75 }
  ];
  res.json(products);
});

// Cart API (simple in-memory cart)
let cart = { items: [], total: 0.00 };

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart/add', (req, res) => {
  const { productId } = req.body;
  const products = [
    { id: 1, name: 'Reusable Water Bottle', price: 14.20 },
    { id: 2, name: 'Organic Cotton T-Shirt', price: 22.50 },
    { id: 3, name: 'Bamboo Cutting Board', price: 32.00 },
    { id: 4, name: 'Glass Food Storage Set', price: 28.75 }
  ];
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Add item to cart
  cart.items.push(product);
  cart.total += product.price;
  
  res.json(cart);
});

// Round-up calculation API
app.post('/api/roundup', (req, res) => {
  const { cartTotal } = req.body;
  
  // Calculate round-up to nearest dollar
  let roundupAmount = 0;
  if (cartTotal % 1 > 0) {
    roundupAmount = Math.ceil(cartTotal) - cartTotal;
  }
  
  // Impact calculation
  const CO2_PER_TREE = 20000; // grams
  const treesPlanted = roundupAmount / 1.00; // $1 per tree
  const co2Offseted = treesPlanted * CO2_PER_TREE;
  
  res.json({
    roundupAmount: roundupAmount.toFixed(2),
    treesPlanted: treesPlanted.toFixed(3),
    co2Offseted: co2Offseted.toFixed(0)
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Eco-Cart server running on port ${PORT}`);
});

module.exports = app;