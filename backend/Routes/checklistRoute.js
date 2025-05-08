import express from 'express';
import { body } from 'express-validator';
import { 
  getChecklistItems, 
  createChecklistItem, 
  updateChecklistItem, 
  deleteChecklistItem 
} from '../controllers/checklistController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all checklist items
router.get('/', getChecklistItems);

// Create new checklist item
router.post('/', [
  body('title').notEmpty().trim(),
  body('description').optional().trim(),
  body('completed').isBoolean(),
  body('category').isIn(['pre-purchase', 'purchase', 'post-purchase']),
  body('dueDate').optional().isISO8601()
], createChecklistItem);

// Update checklist item
router.put('/:id', [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('completed').optional().isBoolean(),
  body('category').optional().isIn(['pre-purchase', 'purchase', 'post-purchase']),
  body('dueDate').optional().isISO8601()
], updateChecklistItem);

// Delete checklist item
router.delete('/:id', deleteChecklistItem);

export default router; 