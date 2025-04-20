import express from 'express';
import { createForumPost } from '../controllers/forumController.js';

const router = express.Router();

// POST - create a new forum post
router.post('/', createForumPost);

export default router;
