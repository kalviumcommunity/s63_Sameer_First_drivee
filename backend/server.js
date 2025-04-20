import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import carRoutes from './Routes/carRoute.js';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', carRoutes);

import { createCar, getAllCars, getCarById } from './controllers/carController.js';
import { getUserComparisons } from './controllers/comparisonController.js';
import { getAllForumPosts, getForumPostById } from './controllers/forumController.js';
import { getUserSavedCars, getUserSavedComparisons } from './controllers/userController.js';

const router = express.Router();
router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.get('/comparisons/user/:userId', getUserComparisons);
router.get('/forum', getAllForumPosts);
router.get('/forum/:id', getForumPostById);
router.get('/users/:userId/saved-cars', getUserSavedCars);
router.get('/users/:userId/saved-comparisons', getUserSavedComparisons);
router.post('/cars', createCar);

export default router;

const PORT = process.env.PORT || 5000;



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit with failure
  }
};

connectDB();


app.get('/', (req, res) => res.send('FirstDrive Backend Running!'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});