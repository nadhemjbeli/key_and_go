// Assuming you have set up Mongoose and have a 'VehicleKey' model
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user making the comment
    vehicleKey: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleKey' }, // Reference to the VehicleKey
    text: String,
    createdAt: { type: Date, default: Date.now },
});

const CommentKey = mongoose.model('Comment', commentSchema);

module.exports = {CommentKey};