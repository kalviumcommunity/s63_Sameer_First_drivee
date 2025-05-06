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
    required: true,
    enum: ['sedan', 'suv', 'hatchback', 'truck', 'van', 'coupe']
  },
  price: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['petrol', 'diesel', 'electric', 'hybrid']
  },
  features: [{
    type: String
  }],
  maintenanceCost: {
    type: Number,
    required: true
  },
  safetyRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  resaleValue: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid image URL'
    }
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Add indexes for common queries
carSchema.index({ brand: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ type: 1 });

export default mongoose.model('Car', carSchema);
