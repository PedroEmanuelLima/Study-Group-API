const mongoose = require('mongoose');

const GrupoSchema = mongoose.Schema({
    meta: {
        type: String,
        required: true,
    },
    dia: {
        type: String,
        enum: ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA",
            "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"],
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Grupo', GrupoSchema);