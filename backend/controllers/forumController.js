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
  