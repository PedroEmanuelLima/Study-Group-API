const mongoose = require('mongoose');

const DocumentoSchema = mongoose.Schema(
    {
        cloudinary_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
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