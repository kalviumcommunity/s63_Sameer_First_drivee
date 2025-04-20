// GET /api/cars
import Car from '../Models/Car.js';

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
  
  