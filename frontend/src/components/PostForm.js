import React, { useState } from 'react';
import axios from 'axios';
import './styles/PostForm.css';


function PostForm() {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!description || !branch) {
      setMessage('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('branch', branch);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const token = localStorage.getItem('authToken'); // Get token from local storage
      if (!token) {
        setMessage('You must be logged in to create a post');
        return;
      }

      const response = await axios.post('http://localhost:5000/posts', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessage('Post created successfully!');
      setDescription('');
      setBranch('');
      setPhoto(null);
    } catch (error) {
      setMessage('Error creating post!');
      console.error(error);
    }
  };

  return (
    <div className="post-form">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description..."
            required
          />
        </div>

        <div className="input-group">
          <label>Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
            {/* Add other branches as needed */}
          </select>
        </div>

        <div className="input-group">
          <label>Photo</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button type="submit" className="btn-submit">Create Post</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default PostForm;
