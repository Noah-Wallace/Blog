const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: [true, 'Post ID is required'],
        index: true
    },
    type: {
        type: String,
        enum: ['like', 'comment', 'share'],
        required: [true, 'Engagement type is required']
    },
    userId: {
        type: String,
        required: [true, 'User ID is required']
    },
    content: {
        type: String,
        required: function() {
            return this.type === 'comment';
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add compound index for better query performance
engagementSchema.index({ postId: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model('Engagement', engagementSchema);
