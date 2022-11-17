const GrupoRoutes = require('express').Router();
const GrupoController = require('../controllers/GrupoController');

GrupoRoutes.post('/create', GrupoController.createGroup);
GrupoRoutes.post('/entrar', GrupoController.joinGroup);
GrupoRoutes.delete('/sair', GrupoController.leaveGroup);
GrupoRoutes.get('/meus/:id', GrupoController.myGroups);
GrupoRoutes.get('/:id', GrupoController.allGroups);

module.exports = GrupoRoutes;