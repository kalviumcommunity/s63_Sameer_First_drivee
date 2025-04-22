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
    // Update user details
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // getting userId from URL
    const { name, email, password } = req.body; // getting fields to update

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully', data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error while updating user' });
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

