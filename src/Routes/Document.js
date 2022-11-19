const DocumentoRoutes = require('express').Router();
const DocumentoController = require('../controllers/DocumentoController');
const multer = require('../config/multerDoc');
const authMiddleware  = require('../middlewres/auth')

DocumentoRoutes.use(authMiddleware);
DocumentoRoutes.get('/:id', DocumentoController.allDocuments);
DocumentoRoutes.get('/download/:id', DocumentoController.downloadDocument);
DocumentoRoutes.post('/send/:id', multer.single('file'), DocumentoController.uploadDocument);

module.exports = DocumentoRoutes;