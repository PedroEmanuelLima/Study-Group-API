const GrupoRoutes = require('express').Router();
const GrupoController = require('../controllers/GrupoController');

GrupoRoutes.post('/create', GrupoController.createGroup);
GrupoRoutes.post('/entrar', GrupoController.joinGroup);
GrupoRoutes.post('/meus', GrupoController.myGroups);
GrupoRoutes.post('/', GrupoController.allGroups);

module.exports = GrupoRoutes;