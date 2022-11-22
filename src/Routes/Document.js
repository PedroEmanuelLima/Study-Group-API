const DocumentoRoutes = require('express').Router();
const DocumentoController = require('../controllers/DocumentoController');
const authMiddleware  = require('../middlewres/auth')

DocumentoRoutes.use(authMiddleware);
DocumentoRoutes.get('/:id', DocumentoController.allDocuments);
DocumentoRoutes.post('/send', DocumentoController.uploadDocument);

module.exports = DocumentoRoutes;