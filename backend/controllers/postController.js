const Post = require('../models/Post');

const createPost = async (req, res) => {
  const { description, image, branches } = req.body;

  try {
    const newPost = new Post({
      user: req.userId,
      description,
      image,
      branches,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

module.exports = { createPost, getPosts };
