const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const auth = require('../middleware/auth');

// Get all cars with optional filters
router.get('/', async (req, res) => {
  try {
    const { make, model, minPrice, maxPrice, minYear, maxYear, fuelType, transmission, bodyType } = req.query;
    
    const filter = {};
    if (make) filter.make = make;
    if (model) filter.model = model;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = Number(minYear);
      if (maxYear) filter.year.$lte = Number(maxYear);
    }
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (bodyType) filter.bodyType = bodyType;
    filter.status = 'available';

    const cars = await Car.find(filter)
      .populate('seller', 'username email')
      .sort({ createdAt: -1 });

    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
});

// Get single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('seller', 'username email');
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car', error: error.message });
  }
});

// Create new car listing (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const car = new Car({
      ...req.body,
      seller: req.user.userId
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error creating car listing', error: error.message });
  }
});

// Update car listing (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller or admin
    if (car.seller.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Error updating car listing', error: error.message });
  }
});

// Delete car listing (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller or admin
    if (car.seller.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await car.remove();
    res.json({ message: 'Car listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car listing', error: error.message });
  }
});

module.exports = router; 