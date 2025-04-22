import express from 'express';
import { createForumPost, getAllForumPosts, getForumPostById, updateForumPost } from '../controllers/forumController.js';

const router = express.Router();

// POST - create a new forum post
router.post('/', createForumPost);


// GET - Get all forum posts
router.get('/forum', getAllForumPosts);
// PUT - Update a forum post
router.put('/forum/:id', updateForumPost);

// GET - Get a single forum post
router.get('/forum/:id', getForumPostById);



export default router;
