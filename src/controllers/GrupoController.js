const Grupo = require('../models/Grupo');
const Estudante = require('../models/Estudante');
const GrupoEstudante = require('../models/Grupo_Estudante');



module.exports = {

    // Criar grupo
    async createGroup(req, res) {
        const { meta, descricao, dia, estudanteId } = req.body;
        try {
            // const estudante = await Estudante.findById({ _id: estudanteId });
            const grupo = await Grupo.create({ meta, descricao, dia });
            await GrupoEstudante.create({
                grupo: grupo._id,
                estudante: estudanteId,
            });
        
            res.status(200).json(grupo);
      
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message: "Erro ao criar grupo!"
            });
      
        }
    },
    
    // Entrar em grupo
    async joinGroup(req, res) {
        
        const {estudanteId, grupoId} = req.body;

        try {
            const grupo = await Grupo.findById({_id: grupoId});
            await GrupoEstudante.create({
                grupo: grupoId,
                estudante: estudanteId,
            });
            
            return res.status(200).json(grupo);
        }catch(err) {
            return res.status(500).json({ message: "Falha ao tentar entrar no grupo. Tente mais tarde."})
        }
    },

    // Sair de grupo
    async leaveGroup(req, res) {
        
        const {estudanteId, grupoId} = req.body;
        
        try {
            const deletecao = await GrupoEstudante.deleteOne({estudante: estudanteId, grupo: grupoId});
        
            if (!deletecao.acknowledged) return res.status(402).json({message: "Inacessivel no momento."});
            return res.status(200).json({message: "Exito em sair de grupo."});

        }catch(err) {
            return res.status(500).json({ message: "Falha ao tentar sair de grupo. Tente mais tarde."})
        }
    },

    // Grupos de um usuário
    async myGroups(req, res) {
       
        const id = req.params.id;

        try {
            const myGroups = await GrupoEstudante.find({estudante: id}, {_id: 0, grupo: 1}).populate('grupo');
            return res.status(200).json(myGroups);
        } catch (err) {
            return res.status(500).json({error: "Falha ao tentar localizar grupos. Tente mais tarde."})
        }
    },

    // Grupos por ID
    async group(req, res) {
       
        const id = req.params.id;

        try {
            const grupo = await Grupo.findById({_id: id});
        
            res.status(200).json(grupo);
    
        } catch (error) {
        
            res.status(500).json({
                message: "Grupo não encontrado!"
            });
        }  
    },

    // Todos os grupos
    async allGroups(req, res) {
       
        const id = req.params.id;

        try {
            const myGroups = await GrupoEstudante.find({estudante: id});
            const myGroupsId = myGroups.map(g => g.grupo.toString());
            const grupos = await Grupo.find();
            const allGrupos = grupos.filter(g => !myGroupsId.includes(g._id.toString()));
        
            res.status(200).json( allGrupos );
    
        } catch (error) {
        
            res.status(500).json({
                message: "Erro ao listar todos os grupos!"
            });
        }  
    }
}
