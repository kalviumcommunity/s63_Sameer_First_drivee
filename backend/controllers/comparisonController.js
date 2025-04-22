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

export const createComparison = async (req, res) => {
  try {
    const { userId, carIds } = req.body;

    if (!userId || !carIds || !Array.isArray(carIds)) {
      return res.status(400).json({ message: 'Invalid input. userId and carIds array are required.' });
    }

    const newComparison = new Comparison({
      userId,
      carsCompared: carIds.map(carId => ({ carId }))
    });

    await newComparison.save();

    res.status(201).json({ message: 'Comparison created successfully', data: newComparison });
  } catch (error) {
    console.error('Error creating comparison:', error);
    res.status(500).json({ message: 'Server error while creating comparison' });
  }
};
// Update a comparison
export const updateComparison = async (req, res) => {
  try {
    const { id } = req.params; // Comparison ID from URL
    const updatedData = req.body; // New data from client

    const comparison = await Comparison.findById(id);

    if (!comparison) {
      return res.status(404).json({ message: 'Comparison not found' });
    }

    // Update fields dynamically
    Object.keys(updatedData).forEach((key) => {
      comparison[key] = updatedData[key];
    });

    await comparison.save();

    res.status(200).json({ message: 'Comparison updated successfully', data: comparison });
  } catch (error) {
    console.error('Error updating comparison:', error);
    res.status(500).json({ message: 'Server error while updating comparison' });
  }
};