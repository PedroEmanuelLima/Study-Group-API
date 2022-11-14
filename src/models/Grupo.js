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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GrupoSchema = new Schema({

    nome: {
      type: String,
      required: 'Nome'
    },
    capacidade: {
        type: String,
        required: 'Capacidade'
    },

    data_criacao: {
        type: Date,
        default: Date.now
      },
    
    });
  
  
    module.exports = mongoose.model('Grupos', GrupoSchema);
