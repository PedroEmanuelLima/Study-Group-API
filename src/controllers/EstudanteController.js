const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const cloudinary = require('../config/CloudinaryConfig');
const Estudante = require('../models/Estudante');
const Resource = require('../models/Resource');

const generateToken = (params = {}) => {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400 // one day
    })
}

module.exports = {
    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const estudante = await Estudante.findOne({ email: email }).select('+password').populate("resource");

            if(!estudante) {
                return res.status(404).json({ message: 'Conta não encontrada' });
            }

            if(! await bcrypt.compare(senha, estudante.senha)) {
                return res.status(400).json({ message: 'Senha incorreta' });
            }

            estudante.password = undefined;
            return res.status(200).json({
                estudante,
                token: generateToken({ id: estudante.id, name: estudante.name })
            })

        } catch (error) {
            return res.status(400).json({ message: 'Error sign in' });
        }
    },
    
    async create(req, res) {
        const { nome, email, senha } = req.body;
        const file = req.file;

        try {
            if( await Estudante.findOne({ email: email })) {
                return res.status(400).json({ message: 'Estudante já existe' })
            }

            if (file) {
                // create resource

                const uploadResult = await cloudinary.uploader.upload(file.path,{ folder: "study-group"}, (error) => {
                    if(error) {
                        return res.status(400).send({ message: 'Falha no upload de imagem' });
                    }
                });

                const resource = await Resource.create({
                    cloudinary_id: uploadResult.public_id,
                    secure_url: uploadResult.secure_url
                });

                const data = {
                    nome, email, senha,
                    resource: resource._id
                }
            
                const estudante = await Estudante.create(data);

                estudante.senha = undefined;
                return res.status(200).json( estudante );
            }

            const estudante = await Estudante.create({ nome, email, senha });

            estudante.senha = undefined;
            return res.status(200).json( estudante );
        }catch(err) {
            return res.status(401).json({ message: 'Falha na criação de novo estudante', err });
        }
    },

    async modifyImage(req, res) {
        const { estudanteId } = req.body;
        const file = req.file;

        let estudante = await Estudante.findById({_id: estudanteId}).populate("resource");

        try {
            if(estudante.resource) {
                await cloudinary.uploader.destroy(estudante.resource.cloudinary_id);
                const uploadResult = await cloudinary.uploader.upload(file.path, { folder: "study-group"});

                await Resource.updateOne(
                    { _id: estudante.resource._id },
                    { 
                        cloudinary_id: uploadResult.public_id,
                        secure_url: uploadResult.secure_url  
                    });
            } else {
                const uploadResult = await cloudinary.uploader.upload(file.path, { folder: "study-group"}, (error) => {
                    if(error) {
                        return res.status(400).send({ message: 'Fail to upload image' });
                    }
                })
                const resource = await Resource.create({
                    cloudinary_id: uploadResult.public_id,
                    secure_url: uploadResult.secure_url
                })
                estudante = await (await Estudante.findByIdAndUpdate({_id: estudanteId}, {resource: resource._id}, {rawResult: true})).value;
            }

            console.log(estudante)
            res.status(200).json(estudante);
        } catch (err) {
            return res.status(500).json({message: "Tente mais tarde", err})
        }
    }
}

