
const Annonce = require("../../Models/Announce");

// TODO Get all Announces
const getAllAnnonces = async (req, res) => {
    try {
        const {location, personnes, chambres} = req.query
        let query = {};

        // Check if location parameter exists and construct query accordingly
        if (location) {
            query = { ...query, location: location };
        }

        // Check if personnes parameter exists and construct query accordingly
        if (personnes) {
            query = { ...query, capacite: personnes };
        }

        // Check if chambres parameter exists and construct query accordingly
        if (chambres) {
            query = { ...query, chambres: chambres };
        }
        // console.log(query)

        const annonces = await Annonce.find(query).populate('hote', 'fullname email').populate("evennement");
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// TODO: search Annonces : chambres, lits, ville
const getAllAnnoncesByChambresLitsVille = async (req, res) => {
    try {
        console.log(req.query);
        const annonces = await Annonce.find().populate('hote', 'fullname email');
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// TODO: search Annonces by event : chambres, personnes
const getAllAnnouncementsByEvent = async (req, res) => {
    try {
        const {personnes, chambres} = req.query
        let query = {evennement:req.params.idEvent};

        // Check if personnes parameter exists and construct query accordingly
        if (personnes) {
            query = { ...query, capacite: personnes };
        }

        // Check if chambres parameter exists and construct query accordingly
        if (chambres) {
            query = { ...query, chambres: chambres };
        }
        const annonces = await Annonce.find(query).populate('hote', 'fullname email');
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getAllAnnouncementsByHost = async (req, res) => {
    try {
        console.log("req.user:");
        console.log(req.userr);
        const annonces = await Annonce.find({hote:req.userr._id}).populate('hote', 'fullname email');
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createAnnounce = async (req, res) => {
    let annonce = new Annonce(req.body);
    annonce.hote = req.userr._id;
    // console.log(annonce)
    try {
        const newAnnonce = await annonce.save();
        res.status(201).json(newAnnonce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {getAllAnnonces, getAllAnnoncesByChambresLitsVille, getAllAnnouncementsByHost, getAllAnnouncementsByEvent, createAnnounce};