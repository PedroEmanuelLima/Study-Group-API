const DocumentoRoutes = require('express').Router();
const DocumentoController = require('../controllers/DocumentoController');
const multer = require('../config/multerDoc');

DocumentoRoutes.get('/:id', DocumentoController.allDocuments);
DocumentoRoutes.get('/download/:id', DocumentoController.downloadDocument);
DocumentoRoutes.post('/enviar/:id', multer.single('file'), DocumentoController.uploadDocument);

module.exports = DocumentoRoutes;