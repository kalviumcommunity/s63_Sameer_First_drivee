// GET /api/cars
import Car from '../Models/Car.js';
import bcrypt from 'bcryptjs';

export const getAllCars = async (req, res) => {
  try {
    const { type, fuelType, minPrice, maxPrice } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (fuelType) filter.fuelType = fuelType;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const cars = await Car.find(filter);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars', error });
  }
};

// GET /api/cars/:id
export const getCarById = async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch car', error });
    }
  };
  


// POST API to create a new Car
export const createCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      type,
      price,
      mileage,
      fuelType,
      maintenanceCost,
      safetyRating,
      resaleValue
    } = req.body;

    // Basic validation (optional)
    if (!brand || !model || !year || !type || !price || !mileage || !fuelType) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const newCar = new Car({
      brand,
      model,
      year,
      type,
      price,
      mileage,
      fuelType,
      maintenanceCost,
      safetyRating,
      resaleValue
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update car details
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params; // Car ID from URL
    const updatedData = req.body; // New data from client

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Update the car with new data
    Object.keys(updatedData).forEach((key) => {
      car[key] = updatedData[key];
    });

    await car.save();

    res.status(200).json({ message: 'Car updated successfully', data: car });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Server error while updating car' });
  }
};