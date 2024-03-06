const express = require('express');
const router = express.Router();
const {CommentKey} = require('../../Models/CommentKey');
const {protect} = require("../../middleware/authMiddleware");

// Endpoint to add a comment to a specific VehicleKey
router.post('/:vehicleId', protect, async (req, res) => {
    const { text } = req.body;
    const userId = req.user._id;
    const vehicleId = req.params.vehicleId;

    try {
        const comment = new CommentKey({ user: userId, vehicleKey: vehicleId, text });
        await comment.save();

        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:vehicleId', async (req, res) => {
    const vehicleId = req.params.vehicleId;

    try {
        const comments = await CommentKey.find({ vehicleKey: vehicleId }).populate('user', 'fullname'); // Populate user details
        res.status(200).json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;