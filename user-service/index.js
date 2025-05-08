const express = require('express');
const mongoose = require('mongoose');
const User = require('./user.model');
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/userdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Create a new user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('User service is up and running!');
});

// Start server
app.listen(3001, () => console.log('User service on port 3001'));
