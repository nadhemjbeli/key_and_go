const mongoose = require('mongoose');
let schemaUser = mongoose.Schema({
    fullname: {type: String, required: false},
    surname: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false},
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    provider:  {type: String, required: false},
    accountId:  {type: String, required: false},
    hote_verifie:  {type: Boolean, default: false},
})

var User = mongoose.model('User',schemaUser);

module.exports = User;