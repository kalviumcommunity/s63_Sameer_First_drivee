// GET /api/forum
import ForumPost from '../Models/ForumPost.js';

export const getAllForumPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find().populate('author', 'username').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch forum posts', error });
  }
};

// GET /api/forum/:id
export const getForumPostById = async (req, res) => {
    try {
      const post = await ForumPost.findById(req.params.id).populate('author', 'username').populate('answers.user', 'username');
      if (!post) return res.status(404).json({ message: 'Post not found' });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch post', error });
    }
  };

  export const createForumPost = async (req, res) => {
    try {
      const { userId, question } = req.body;
  
      if (!userId || !question) {
        return res.status(400).json({ message: 'userId and question are required.' });
      }
  
      const newPost = new ForumPost({
        userId,
        question
      });
  
      await newPost.save();
  
      res.status(201).json({ message: 'Forum post created successfully', data: newPost });
    } catch (error) {
      console.error('Error creating forum post:', error);
      res.status(500).json({ message: 'Server error while creating forum post' });
    }
  };
  