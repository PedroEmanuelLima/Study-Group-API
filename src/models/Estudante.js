const mongoose = require('mongoose');

const EstudanteSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
    },
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource', required: false
    },
});

module.exports = mongoose.model('Estudante', EstudanteSchema);