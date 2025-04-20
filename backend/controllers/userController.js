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
  
  export const createUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
      }
  
      const newUser = new User({
        name,
        email,
        password,
        role
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error while creating user' });
    }
  };