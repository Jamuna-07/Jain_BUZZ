// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import route files
const authRoutes = require('./routes/auth'); // Authentication routes
const postRoutes = require('./routes/posts'); // Post management routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define API routes
app.use('/auth', authRoutes); // Routes for login, register, etc.
app.use('/posts', postRoutes); // Routes for posts management

// Health-check route for the backend
app.get('/', (req, res) => res.send('JainBUZZ backend is running!'));

// Start the server
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
