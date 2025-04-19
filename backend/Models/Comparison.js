import mongoose from 'mongoose';

const comparisonSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carsCompared: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Comparison', comparisonSchema);
