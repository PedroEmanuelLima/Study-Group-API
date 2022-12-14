const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cloudinary = require('../config/CloudinaryConfig');
const Estudante = require('../models/Estudante');
const Resource = require('../models/Resource');
const enviarEmail = require('../config/SendEmail');

const generateToken = (params = {}) => {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400 // one day
    })
}

const gerarSenhaAleatoria = () => {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
    var passwordLength = 9;
    var password = "";

    for (var i = 0; i < passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
}

const criptografarSenha = async (senha) => {
    const hash = await bcrypt.hash(senha, 10);
    return hash;
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

            estudante.senha = undefined;
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
            
                await Estudante.create(data);

                return res.status(200).json({ message: "Cadastrado com sucesso." });
            }

            await Estudante.create({ nome, email, senha });

            return res.status(200).json({ message: "Cadastrado com sucesso." });
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

            estudante = await Estudante.findById({_id: estudanteId}).populate("resource");
            estudante.senha = undefined;
            res.status(200).json(estudante);
        } catch (err) {
            return res.status(500).json({message: "Tente mais tarde", err})
        }
    },

    async modifyPassword(req, res) {
        const { estudanteId, senhaAtual, novaSenha } = req.body;

        let estudante = await Estudante.findById({_id: estudanteId});

        try {
            if(!estudante) {
                return res.status(404).json({message: "Conta não encontrada."})
            }

            if(! await bcrypt.compare(senhaAtual, estudante.senha)) {
                return res.status(400).json({ message: 'Senha incorreta' });
            }

            const novaSenhaEnc = await criptografarSenha(novaSenha);

            estudante = await Estudante.updateOne(
                { _id: estudante._id },
                { 
                    senha: novaSenhaEnc  
                }
            );
            estudante.senha = undefined;

            res.status(200).json({message: "Senha modificada com sucesso."});
        } catch (err) {
            return res.status(500).json({message: "Tente mais tarde", err})
        }
    },

    async resetPassword(req, res) {
        const { email } = req.body;

        let estudante = await Estudante.findOne({email: email});

        try {
            if(!estudante) {
                return res.status(404).json({message: "Conta não encontrada."})
            }

            let senhaAleatoria = gerarSenhaAleatoria();
            
            const send = await enviarEmail.send(email, senhaAleatoria);
            if (!send) {
                return res.status(400).json({message: "Falha no envio de email."})
            }

            senhaAleatoria = await criptografarSenha(senhaAleatoria);
            
            await Estudante.updateOne(
                { email: email },
                { 
                    senha: senhaAleatoria  
                }
            );

            return res.status(200).json({message: "Nova senha enviada para email."});
        } catch (err) {
            return res.status(500).json({message: "Tente mais tarde"})
        }
    }
}

