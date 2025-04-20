// GET /api/users/:userId/saved-cars
import User from '../Models/User.js';

export const getUserSavedCars = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('savedCars');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.savedCars);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch saved cars', error });
  }
};

// GET /api/users/:userId/saved-comparisons
export const getUserSavedComparisons = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('savedComparisons');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user.savedComparisons);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch saved comparisons', error });
    }
  };
  