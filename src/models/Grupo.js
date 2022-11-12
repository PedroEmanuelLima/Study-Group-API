const mongoose = require('mongoose');

const GrupoSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    dia: {
        type: String,
        require: true,
    },
    descricao: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Grupo', GrupoSchema);