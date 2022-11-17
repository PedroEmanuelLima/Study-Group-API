const Grupo = require('../models/Grupo');
const GrupoEstudante = require('../models/Grupo_Estudante');



module.exports = {

    // Criar grupo
    async createGroup(req, res) {
        
        const { meta, descricao, dia } = req.body;
        try {
   
            const grupo = await Grupo.create({ meta, descricao, dia });
        
            res.status(200).json(grupo);
      
        } catch (error) {
            
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
            
            if (!deletecao.acknowledged) return res.status(402).json({message: "Inacessivel no omento."});
            return res.status(200).json({message: "Exito em sair de grupo."});

        }catch(err) {
            return res.status(500).json({ message: "Falha ao tentar sair de grupo. Tente mais tarde."})
        }
    },

    // Grupos de um usuário
    async myGroups(req, res) {
       
        const id = req.params.id;

        try {
            const myGroups = await GrupoEstudante.find({estudante: id}).populate("grupo");
            return res.status(200).json(myGroups);
        } catch (err) {
            return res.status(500).json({error: "Falha ao tentar localizar grupos. Tente mais tarde."})
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
        
            res.status(200).json({ allGrupos });
    
        } catch (error) {
        
            res.status(500).json({
                message: "Erro ao listar todos os grupos!"
            });
        }  
    }
}
