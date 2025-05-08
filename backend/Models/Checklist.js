import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['pre-purchase', 'purchase', 'post-purchase'],
    required: true
  },
  dueDate: {
    type: Date
  }
}, {
  timestamps: true
});

const Checklist = mongoose.model('Checklist', checklistItemSchema);

export default Checklist; 