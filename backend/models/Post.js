const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  image: { type: String },
  branches: { type: [String], required: true }, // Target audience
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);

