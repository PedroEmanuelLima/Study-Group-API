const mongoose = require('mongoose');

const GrupoSchema = mongoose.Schema({
    nome: String,
    dia: String,
    descricao: String,
});

module.exports = mongoose.model('Grupo', GrupoSchema);