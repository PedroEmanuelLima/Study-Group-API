const EstudanteRoutes = require('express').Router();
const multer = require('../config/multer');

const EstudanteController = require('../controllers/EstudanteController');

EstudanteRoutes.post('/login', EstudanteController.login);
EstudanteRoutes.post('/create', multer.single("imagemPerfil"), EstudanteController.create);
EstudanteRoutes.patch('/modifyImage', multer.single("imagemPerfil"), EstudanteController.modifyImage);

module.exports = EstudanteRoutes;