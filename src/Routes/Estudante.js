const EstudanteRoutes = require('express').Router();
const multer = require('../config/multerImage');
const authMiddleware  = require('../middlewres/auth')

const EstudanteController = require('../controllers/EstudanteController');

EstudanteRoutes.post('/login', EstudanteController.login);
EstudanteRoutes.post('/create', multer.single("imagemPerfil"), EstudanteController.create);
EstudanteRoutes.post('/resetPassword', EstudanteController.resetPassword);

EstudanteRoutes.use(authMiddleware);
EstudanteRoutes.put('/modifyImage', multer.single("imagemPerfil"), EstudanteController.modifyImage);
EstudanteRoutes.post('/modifyPassword', EstudanteController.modifyPassword);

module.exports = EstudanteRoutes;