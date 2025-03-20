const mongoose = require('mongoose');

const userAnalyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    actions: [{
        action: String,
        data: Object,
        timestamp: Date
    }],
    metrics: {
        loginCount: {
            type: Number,
            default: 0
        },
        sessionDuration: {
            type: Number,
            default: 0
        },
        errorRate: {
            type: Number,
            default: 0
        },
        featureUsage: {
            type: Map,
            of: Number,
            default: {}
        }
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserAnalytics', userAnalyticsSchema); 