import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['sedan', 'suv', 'hatchback', 'truck', 'coupe', 'convertible'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true // km/l or mpg
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    required: true
  },
  maintenanceCost: {
    type: Number // yearly estimated maintenance cost
  },
  safetyRating: {
    type: Number, // out of 5
    min: 0,
    max: 5
  },
  resaleValue: {
    type: Number // percentage
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Car', carSchema);
