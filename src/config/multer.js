const multer = require('multer');
const path = require('path');


module.exports = multer({
    storage: multer.diskStorage({
        filename: function (req, file, callback) {
            // Extração da extensão do arquivo original:
            const extensaoArquivo = path.extname(file.originalname);
    
            // Cria um código randômico que será o nome do arquivo
            const novoNomeArquivo = require('crypto')
                .randomBytes(32)
                .toString('hex');
    
            // Indica o novo nome do arquivo:
            callback(null, `${novoNomeArquivo}.${extensaoArquivo}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
          }
        cb(null, true)
    }
});