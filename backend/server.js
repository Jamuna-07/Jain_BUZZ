const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all origins

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/auth', authRoutes); // User authentication routes (login, register)
app.use('/posts', postRoutes); // Post-related routes (create, get posts)

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Email validation function (only allow @jainuniversity.ac.in domain)
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@jainuniversity\.ac\.in$/;
  return emailRegex.test(email);
};

// Registration route
app.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email domain
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Only @jainuniversity.ac.in email addresses are allowed' });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to the database (use a User model)
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email domain
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email domain. Only @jainuniversity.ac.in is allowed' });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  res.json({ token });
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello JainBUZZ backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
