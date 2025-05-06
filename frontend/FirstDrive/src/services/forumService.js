import axios from 'axios';

const API_URL = '/api/forum';

// Get all forum posts with optional filters
const getAllPosts = async (filters = {}) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};

// Get a post by ID
const getPostById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

// Update a post
const updatePost = async (id, postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${id}`, postData, config);
  return response.data;
};

// Delete a post
const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// Add a comment to a post
const addComment = async (postId, commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/${postId}/comments`, commentData, config);
  return response.data;
};

// Delete a comment
const deleteComment = async (postId, commentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${postId}/comments/${commentId}`, config);
  return response.data;
};

const forumService = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment,
};

export default forumService; 