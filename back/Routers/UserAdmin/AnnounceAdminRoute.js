const express = require("express");
const router = express.Router();
const Annonce = require('../../Models/Announce');
const User = require('../../Models/User');
const multer = require("multer");
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


// Middleware pour l'authentification de l'administrateur
const authenticateAdmin = (req, res, next) => {
    // Implémenter la logique d'authentification de l'administrateur ici
    // Par exemple, vérifier si l'utilisateur est connecté en tant qu'administrateur
    // Si l'authentification réussit, appeler next()
    // Sinon, renvoyer une réponse d'erreur ou rediriger vers la page de connexion de l'administrateur
    next();
};

// Route pour obtenir toutes les annonces
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const annonces = await Annonce.find().populate('hote', 'fullname');
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour obtenir une annonce spécifique
router.get('/:id', authenticateAdmin, getAnnonce, (req, res) => {
    res.json(res.annonce);
});

// Route pour ajouter une nouvelle annonce
router.post('/:id', authenticateAdmin, getUser,async (req, res) => {
    let annonce = new Annonce(req.body);
    annonce.hote = res.user;
    try {
        const newAnnonce = await annonce.save();
        res.status(201).json(newAnnonce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour mettre à jour une annonce
router.patch('/:id', authenticateAdmin, getAnnonce, async (req, res) => {
    if (req.body.titre != null) {
        res.annonce.titre = req.body.titre;
    }
    if (req.body.description != null) {
        res.annonce.description = req.body.description;
    }
    // Ajouter d'autres champs à mettre à jour selon les besoins

    try {
        const updatedAnnonce = await res.annonce.save();
        res.json(updatedAnnonce);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer une annonce
router.delete('/:id', authenticateAdmin, getAnnonce, async (req, res) => {
    try {
        await res.annonce.remove();
        res.json({ message: 'Annonces supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware pour récupérer une annonce par ID
async function getAnnonce(req, res, next) {
    let annonce;
    try {
        annonce = await Annonce.findById(req.params.id).populate('hote', 'fullname');
        if (annonce == null) {
            return res.status(404).json({ message: 'Annonces non trouvée' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.annonce = annonce;
    next();
}

// Middleware pour récupérer une utilisateur par ID
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Utilisateur non trouvée' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = req.params.id;
    next();
}

module.exports = router;
