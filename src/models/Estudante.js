const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        ref: 'Resource', require: false
    },
});

EstudanteSchema.pre('save', async function (next) {
    const hash =  await bcrypt.hash(this.senha, saltRounds)
    this.senha = hash
    next()
})

module.exports = mongoose.model('Estudante', EstudanteSchema);