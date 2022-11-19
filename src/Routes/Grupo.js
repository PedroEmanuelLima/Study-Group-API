const GrupoRoutes = require('express').Router();
const GrupoController = require('../controllers/GrupoController');
const authMiddleware  = require('../middlewres/auth')

GrupoRoutes.use(authMiddleware);
GrupoRoutes.post('/create', GrupoController.createGroup);
GrupoRoutes.post('/join', GrupoController.joinGroup);
GrupoRoutes.delete('/leave', GrupoController.leaveGroup);
GrupoRoutes.get('/my/:id', GrupoController.myGroups);
GrupoRoutes.get('/:id', GrupoController.group);
GrupoRoutes.get('/all/:id', GrupoController.allGroups);

module.exports = GrupoRoutes;