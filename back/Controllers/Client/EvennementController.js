const Evennement = require("../../Models/Evennement");

// Get all vehicle keys
const getAllEvennements = async (req, res) => {
    try {

        const evennements = await Evennement.find();
        res.json(evennements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createEvennement = async (req, res) => {
    let event = new Evennement(req.body);
    // event.hote = req.userr._id;
    // console.log(annonce)
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Middleware pour récupérer une evennement par ID
const getEvennement = async (req, res, next) =>{
    let evennement;
    try {
        evennement = await Evennement.findById(req.params.id);
        if (evennement == null) {
            res.status(404).json({ message: 'Evennement non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.status(201).json(evennement);
    next();
}

module.exports = {createEvennement, getAllEvennements, getEvennement}