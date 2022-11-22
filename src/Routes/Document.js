const DocumentoRoutes = require('express').Router();
const DocumentoController = require('../controllers/DocumentoController');
const multer = require('../config/multerFile');
const authMiddleware  = require('../middlewres/auth')

DocumentoRoutes.use(authMiddleware);
DocumentoRoutes.get('/:id', DocumentoController.allDocuments);
DocumentoRoutes.post('/send', multer.single("file"),DocumentoController.uploadDocument);

module.exports = DocumentoRoutes;