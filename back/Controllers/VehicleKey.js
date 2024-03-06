const {VehicleKey} = require('../models/VehicleKey');
const fs = require('fs');
const path = require('path');


// Get all vehicle keys
const getAllVehicleKeys = async (req, res) => {
    try {
        const vehicleKeys = await VehicleKey.find();
        res.json(vehicleKeys);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
const showVehicleKeyDetails = async (req, res) => {
    try {
        const vehicleKey = await VehicleKey.findOne({_id:req.params.id})
            .populate('owner', 'fullname');
        res.json(vehicleKey);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new vehicle key
const createVehicleKey = async (req, res) => {
    const { make, model, images } = req.body; // Assuming make, model, and images are sent in the request body
    // console.log(req.body)
    try {
        // console.log(images)
        // console.log(model)
        // Create a new VehicleKey instance
        const newVehicleKey = await VehicleKey.create({vehicleInfo: {make, model}, owner: req.user._id});

        // Process and save images to the uploads folder
        const uploadedImageNames = [];

        if (images && Array.isArray(images)) {
            for (const image of images) {
                const imageName = `image_${Date.now()}${path.extname(image.originalname)}`; // Generate a unique filename
                const imagePath = path.join(__dirname, '../../uploads', imageName); // Destination path
                await fs.promises.writeFile(imagePath, image.buffer); // Save the image
                uploadedImageNames.push(imageName);
            }
        }

        // Update the new VehicleKey instance with the image filenames
        newVehicleKey.images = uploadedImageNames;
        // console.log(newVehicleKey.populate("owner", "fullname"))
        await newVehicleKey.save();
        const populatedKey = await VehicleKey.findById(newVehicleKey._id).populate('owner', 'fullname');
        res.status(201).json(populatedKey);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
    }
};

// Other controller functions like updateVehicleKey, deleteVehicleKey, etc.

module.exports = {
    getAllVehicleKeys,
    createVehicleKey,
    showVehicleKeyDetails
    // Export other functions as needed
};