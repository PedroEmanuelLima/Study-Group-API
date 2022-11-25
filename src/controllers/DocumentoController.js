const Documento = require('../models/Documento');
const cloudinary = require('../config/CloudinaryConfig');

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
        const file = req.file;
        const { descricao, grupoId} = req.body;
        try {
            const uploadResult = await cloudinary.uploader.upload(file.path,{ folder: "study-group/pdf"}, (error) => {
                if(error) {
                    return res.status(400).send({ message: 'Falha no upload de arquivo.' });
                }
            });

            await Documento.create({
                cloudinary_id: uploadResult.public_id,
                secure_url: uploadResult.secure_url,
                descricao: descricao,
                grupo: grupoId
            });

            const arquivos = await Documento.find({grupo: grupoId}).sort('-post');
            
            return res.status(200).json({arquivos, message: "Submetido com sucesso."})
        }catch(err) {
            return res.status(500).json({message: "Falha. Tente mais tarde"})
        }
    },
}

