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
        const {file, descricao, grupoId} = req.body;
        try {
            await Documento.create({grupo: grupoId, documento: file, descricao});
            
            return res.status(200).json({message: "Submetido com sucesso."})
        }catch(err) {
            return res.status(500).json({message: "Falha. Tente mais tarde"})
        }
    },

    // Obter documento em um grupo
    async downloadDocument(req, res) {
        const id = req.params.id;
        
        try {
            const doc = await Documento.findById({_id: id});
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${doc._id}.pdf`);
            const download = Base64.atob(doc);
            res.status(200).download(download);
        }catch(err) {
            return res.status(500).json({message: "Falha. Tente mais tarde"})
        }
    },
}

