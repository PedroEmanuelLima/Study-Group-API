const EstudanteRoutes = require('express').Router();
const multer = require('multer');

const EstudanteController = require('../controllers/EstudanteController');
const MulterConfig = require('../config/MulterConfig')

EstudanteRoutes.post('/login', EstudanteController.login);
EstudanteRoutes.post('/create', multer({storage: MulterConfig}).single("imagemPerfil"),
    EstudanteController.create);
EstudanteRoutes.patch('/modifyImage',
    multer({storage: MulterConfig}).single("imagemPerfil"),
    EstudanteController.modifyImage);

module.exports = EstudanteRoutes;