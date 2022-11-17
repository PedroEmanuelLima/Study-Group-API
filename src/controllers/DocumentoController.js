const Documento = require('../models/Documento');
const {Base64} = require('js-base64');

module.exports = {
    // todos os documentos de um grupo
    async allDocuments(req, res) {
        const id = req.params.id;
        try {
            const arquivos = await Documento.find({grupo: id}).sort('-post');
            return res.status(200).json(arquivos);
        } catch (error) {
            return res.status(500).json({message: "Falha no carregamento."})
        }
    },
    
    // submeter documento em um grupo
    async uploadDocument(req, res) {
        const id = req.params.id;
        const file = req.file;
        const descricao = req.body.descricao || file.originalname;
        try {
            const base64 = Buffer.from(file.path).toString("base64");
            
            await Documento.create({grupo: id, documento: base64, descricao});
            
            return res.status(200).json({message: "Arquivo submetido com êxito."})
        }catch(err) {
            return res.status(500).json({message: "Falha. Tente mais tarde"})
        }
    },

    // Obter documento em um grupo
    async downloadDocument(req, res) {
        const id = req.params.id;
        
        try {
            const doc = await Documento.findById({_id: id});
            const download = Base64.atob(doc.documento)        
            res.download(download);
        }catch(err) {
            return res.status(500).json({message: "Falha. Tente mais tarde"})
        }
    },
}

