const express = require('express');
const mongoose = require('mongoose');
const Product = require('./product.model');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/productdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create a new product
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('Product service is up and running!');
});

// Start server
app.listen(3002, () => console.log('Product service on port 3002'));
