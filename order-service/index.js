const express = require('express');
const mongoose = require('mongoose');
const Order = require('./order.model');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/orderdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Get all orders
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Create a new order
app.post('/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('Order service is up and running!');
});

// Start server
app.listen(3004, () => console.log('Order service on port 3004'));
