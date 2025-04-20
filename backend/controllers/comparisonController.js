// GET /api/comparisons/user/:userId
import Comparison from '../Models/Comparison.js';

export const getUserComparisons = async (req, res) => {
  try {
    const comparisons = await Comparison.find({ userId: req.params.userId }).populate('carsCompared');
    res.status(200).json(comparisons);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comparisons', error });
  }
};
