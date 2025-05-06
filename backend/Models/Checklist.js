import mongoose from 'mongoose';

const checklistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['inspection', 'paperwork', 'insurance', 'registration', 'financing', 'maintenance']
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: Date,
    completedDate: Date,
    documents: [{
      name: String,
      url: String,
      uploadDate: {
        type: Date,
        default: Date.now
      }
    }],
    notes: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  targetCompletionDate: Date,
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'overdue'],
    default: 'not-started'
  },
  notifications: [{
    message: String,
    date: {
      type: Date,
      default: Date.now
    },
    read: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Calculate progress when items are updated
checklistSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    const completedItems = this.items.filter(item => item.completed).length;
    this.progress = Math.round((completedItems / this.items.length) * 100);
  }
  next();
});

// Update status based on progress and dates
checklistSchema.pre('save', function(next) {
  const now = new Date();
  
  if (this.progress === 100) {
    this.status = 'completed';
  } else if (this.progress > 0) {
    this.status = 'in-progress';
  } else if (this.targetCompletionDate && this.targetCompletionDate < now) {
    this.status = 'overdue';
  }
  
  next();
});

// Indexes for common queries
checklistSchema.index({ user: 1, category: 1 });
checklistSchema.index({ status: 1 });
checklistSchema.index({ 'items.dueDate': 1 });

export default mongoose.model('Checklist', checklistSchema); 