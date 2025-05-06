import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'expert'],
    default: 'user'
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    location: String
  },
  preferences: {
    budget: {
      min: Number,
      max: Number
    },
    carTypes: [{
      type: String,
      enum: ['sedan', 'suv', 'hatchback', 'truck', 'van', 'coupe']
    }],
    fuelTypes: [{
      type: String,
      enum: ['petrol', 'diesel', 'electric', 'hybrid']
    }]
  },
  savedCars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  savedComparisons: [{
    cars: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    }],
    name: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  checklist: {
    documents: [{
      name: String,
      completed: {
        type: Boolean,
        default: false
      },
      dueDate: Date
    }],
    tasks: [{
      name: String,
      completed: {
        type: Boolean,
        default: false
      },
      dueDate: Date
    }]
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Add indexes for common queries
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export default mongoose.model('User', userSchema);
