import express from 'express';
import { createComparison, getUserComparisons, updateComparison } from '../controllers/comparisonController.js';

const router = express.Router();

// POST - create a new comparison
router.post('/', createComparison);
// PUT - Update a comparison
router.put('/comparisons/:id', updateComparison);
// GET - Get comparisons by user
router.get('/comparisons/user/:userId', getUserComparisons);



export default router;




