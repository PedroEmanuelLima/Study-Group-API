const EstudanteRoutes = require('express').Router();

const Estudante = require('../models/Grupo');
const EstudanteController = require('../controllers/GrupoController');

EstudanteRoutes.post('/create', EstudanteController.create);
EstudanteRoutes.patch('/modifyImage',
    multer({storage: MulterConfig}).single("imagemPerfil"),
    EstudanteController.modifyImage);

module.exports = EstudanteRoutes;