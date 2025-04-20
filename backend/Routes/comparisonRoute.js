import express from 'express';
import { createComparison } from '../controllers/comparisonController.js';

const router = express.Router();

// POST - create a new comparison
router.post('/', createComparison);

export default router;
