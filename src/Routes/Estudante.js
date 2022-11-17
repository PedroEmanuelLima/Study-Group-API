const EstudanteRoutes = require('express').Router();
const multer = require('../config/multerImage');
const authMiddleware  = require('../middlewres/auth')

const EstudanteController = require('../controllers/EstudanteController');

EstudanteRoutes.post('/login', EstudanteController.login);
EstudanteRoutes.post('/create', multer.single("imagemPerfil"), EstudanteController.create);
EstudanteRoutes.put('/modifyImage', authMiddleware, multer.single("imagemPerfil"), EstudanteController.modifyImage);

module.exports = EstudanteRoutes;