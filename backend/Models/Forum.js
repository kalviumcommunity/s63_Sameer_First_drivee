import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'buying-advice', 'maintenance', 'insurance', 'paperwork', 'reviews']
  },
  tags: [{
    type: String,
    trim: true
  }],
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    upvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    downvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    isExpertResponse: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isResolved: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for vote count
forumSchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Indexes for common queries
forumSchema.index({ category: 1, createdAt: -1 });
forumSchema.index({ author: 1 });
forumSchema.index({ tags: 1 });
forumSchema.index({ 'comments.author': 1 });

// Update lastActivity on new comments
forumSchema.pre('save', function(next) {
  if (this.isModified('comments')) {
    this.lastActivity = new Date();
  }
  next();
});

export default mongoose.model('Forum', forumSchema); 