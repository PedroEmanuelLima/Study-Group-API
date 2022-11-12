const DocumentoRoutes = require('express').Router();
const DocumentoController = require('../controllers/DocumentoController');

DocumentoRoutes.post('/:id', DocumentoController.allDocuments);
DocumentoRoutes.post('/enviar', DocumentoController.uploadDocument);

module.exports = DocumentoRoutes;