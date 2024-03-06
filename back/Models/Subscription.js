const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subscriptionType: String, // e.g., 'premium', 'gold', etc.
    startDate: { type: Date, default: Date.now },
    endDate: Date,
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = {Subscription};