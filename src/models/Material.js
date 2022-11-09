const mongoose = require('mongoose');

const GrupoSchema = mongoose.Schema({
    url: String,
    grupo: String,
    user: String,
});

module.exports = mongoose.model('Grupo', GrupoSchema);