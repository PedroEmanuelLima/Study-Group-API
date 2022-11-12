const mongoose = require('mongoose');

const GrupoEstudanteSchema = mongoose.Schema({
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo',
    },
    estudante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudante',
    },
});

module.exports = mongoose.model('Grupo_Estudante', GrupoEstudanteSchema);