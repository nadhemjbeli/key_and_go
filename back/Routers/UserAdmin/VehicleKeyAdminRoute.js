const express = require("express");
const {User} = require("../../Models/User");
const {protect} = require("../../middleware/authMiddleware");
const {createVehicleKey, getAllVehicleKeys, showVehicleKeyDetails} = require("../../Controllers/VehicleKey");
const multer = require('multer');
const {VehicleKey} = require("../../Models/VehicleKey");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // set the filename for uploaded files
    }
});

const fileFilter = function (req, file, cb) {
    // set the file filter for uploaded files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const router = express.Router();

router.route("/").post(protect, createVehicleKey)
router.route("/:id").put(protect, upload.single('image'), async (req, res) => {
    const image = req.file.path; // Assuming make, model, and images are sent in the request body
    console.log(image)
    try {
        await VehicleKey.findOne({_id:req.params.id}).then(async vkey=>{
            console.log(vkey)
            vkey.images.push(image)
            await vkey.save().then(k=>{
                res.status(201).json(k);
            }).catch(error=>{
                res.status(401).send(error.message)
            })
        })

        // Process and save images to the uploads folder

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
    }
})
router.route("/").get(getAllVehicleKeys)
router.route("/:id").get(showVehicleKeyDetails)


module.exports = router;