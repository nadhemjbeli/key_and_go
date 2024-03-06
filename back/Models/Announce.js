const mongoose = require('mongoose');

// Schéma pour l'adresse
const AdresseSchema = new mongoose.Schema({
    rue: String,
    ville: String,
    codePostal: String,
    pays: String
});

// Schéma pour l'évaluation
const EvaluationSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Référence à la collection Utilisateurs
    },
    note: Number,
    commentaire: String,
    date: Date
});

// Schéma pour l'annonce
const AnnonceSchema = new mongoose.Schema({
    titre: String,
    description: String,
    typeLogement: String,
    adresse: AdresseSchema,
    prix: Number,
    capacite: Number,
    chambres: Number,
    lits: Number,
    sallesDeBain: Number,
    commodites: [String],
    regles: [String],
    photos: [String],
    typeAnnonce: {
        type: String,
        enum: ['Logement entière', 'Chambre privée'] // Type d'annonce: Maison entière ou Chambre privée
    },
    hote: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Référence à la collection Utilisateurs
    },
    evennement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evennement' // Référence à la collection Utilisateurs
    },
    disponibilites: [{
        dateDebut: Date,
        dateFin: Date
    }],
    Valable:Boolean,
    evaluations: [EvaluationSchema]
    // Autres champs liés à l'annonce
});

// Modèle pour l'annonce
const Annonce = mongoose.model('Annonce', AnnonceSchema);

module.exports = Annonce;
