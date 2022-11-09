const mongoose = require('mongoose');

const EstudanteSchema = mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    imagemPerfil: String,
});

module.exports = mongoose.model('Estudante', EstudanteSchema);