import express from 'express';
import { createUser, updateUser } from '../controllers/userController.js';

const router = express.Router();
// PUT - Update user
router.put('/:userId', updateUser);

// POST - create a new user
router.post('/', createUser);








export default router;
