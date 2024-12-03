const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const users = []; // Mock user storage for now

// Register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email.endsWith('@jainuniversity.ac.in')) {
    return res.status(400).json({ message: 'Invalid email domain' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: email }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
