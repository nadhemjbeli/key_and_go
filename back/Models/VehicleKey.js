const mongoose = require('mongoose');
// if (!mongoose.models.VehicleKey) {

    let schemaVehicleKey = mongoose.Schema({
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // Reference to the owner VehicleKey
        vehicleInfo: {
            make: {type: String, required: false},
            model: {type: String, required: false},
            // Add other details related to the vehicle
        },
        isAvailableForRent: {type: Boolean, default: true}, // Indicates if the key is available for rent
        creationDate: {type: Date, default: Date.now},
        images: [{type: String}], // List of image URLs for the targeted car
    })

    var VehicleKey = mongoose.models.VehicleKey || mongoose.model('VehicleKey', schemaVehicleKey);
// }

module.exports = {VehicleKey};