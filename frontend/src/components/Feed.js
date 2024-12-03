import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    photo: null,
    targetBranch: 'CSE',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('description', formData.description);
    formDataObj.append('photo', formData.photo);
    formDataObj.append('targetBranch', formData.targetBranch);

    try {
      await axios.post('/posts', formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created successfully!');
    } catch (error) {
      alert('Error creating post');
    }
  };

  return (
    <div>
      <h1>Feed</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="description"
          placeholder="What's happening?"
          onChange={handleChange}
          required
        />
        <input type="file" name="photo" onChange={handleFileChange} required />
        <select name="targetBranch" onChange={handleChange}>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="Mechanical">Mechanical</option>
        </select>
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <img src={post.photo} alt={post.description} width="200" />
            <p>{post.description}</p>
            <p>Branch: {post.targetBranch}</p>
            <p>By: {post.createdBy.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
