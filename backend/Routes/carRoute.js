import express from 'express';
import { createCar, getAllCars, getCarById, updateCar } from '../controllers/carController.js';

const router = express.Router();

router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars', async (req, res) => {
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
  
      // If no data is provided (optional dummy data fallback)
      const carData = {
        brand: brand || 'Toyota',
        model: model || 'Corolla',
        year: year || 2023,
        type: type || 'sedan',
        price: price || 20000,
        mileage: mileage || 18,
        fuelType: fuelType || 'petrol',
        maintenanceCost: maintenanceCost || 400,
        safetyRating: safetyRating || 5,
        resaleValue: resaleValue || 85
      };
  
      const newCar = new Car(carData);
      const savedCar = await newCar.save();
  
      res.status(201).json(savedCar);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  



// POST - Create a car
router.post('/cars', createCar);
// PUT - Update a car
router.put('/cars/:id', updateCar);

// GET - Get all cars
router.get('/cars', getAllCars);

// GET - Get single car by id
router.get('/cars/:id', getCarById);




  
  export default router;
