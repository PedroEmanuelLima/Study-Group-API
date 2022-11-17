const mongoose = require('mongoose');

const DocumentoSchema = mongoose.Schema(
    {
        documento: {
            type: String,
            require
        },
        grupo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grupo'
        },
        descricao: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Documento', DocumentoSchema);