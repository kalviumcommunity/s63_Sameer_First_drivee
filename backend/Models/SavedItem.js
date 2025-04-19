import mongoose from 'mongoose';

const savedItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  comparisonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comparison'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SavedItem', savedItemSchema);
