const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Folder where images are stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Create a new post with file upload
router.post('/', verifyToken, upload.single('photo'), async (req, res) => {
  const { description, branch } = req.body;
  const photo = req.file ? req.file.path : null;

  try {
    const newPost = new Post({
      description,
      branch,
      photo,
      userId: req.user.userId,  // Assuming JWT contains userId
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err });
  }
});

module.exports = router;
