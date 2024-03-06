const mongoose = require('mongoose');
const EvennementSchema = new mongoose.Schema({
    titre: String,
    description: String,
    images: [String],
    dateDebut: Date,
    dateFin: Date
});
const Evennement = mongoose.model('Evennement', EvennementSchema);

module.exports = Evennement;