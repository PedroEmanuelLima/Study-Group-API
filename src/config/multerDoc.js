const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        filename: function (req, file, callback) {
            const time = new Date().getTime();
            const novoNomeArquivo = require('crypto')
                .randomBytes(32)
                .toString('hex');
            callback(null, `${time}_${novoNomeArquivo}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            cb(new Error("File type is not supported"), false);
            return;
          }
        cb(null, true)
    }
});