import mongoose from 'mongoose';

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
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'expert'],
    default: 'user'
  },
  savedCars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  savedComparisons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comparison'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);
