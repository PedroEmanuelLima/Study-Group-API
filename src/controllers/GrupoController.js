
module.exports = {

    // Criar grupo
    async createGroup(req, res) {
        
        try {

        } catch (error) {
            
        }
    },
    
    // ENtrar em grupo
    async joinGroup(req, res) {
        
        try {
           
        }catch(err) {
            
        }
    },

    // Grupos de um usuário
    async myGroups(req, res) {
       
        try {
            
        } catch (err) {
            
        }
    },

    // Todos os grupos
    async allGroups(req, res) {
       
        try {
            
        } catch (err) {
            
        }
    }
}

const express = require('express');
const router = express.Router();


const GrupoService = require('../services/GrupoService');


router.route('/Grupo')
      .get(GrupoService.ListarGrupo)
      .post(GrupoService.CriarGrupo);

router.route('/Grupo/:id')
      .get(GrupoService.obterGrupoId)
      .put(GrupoService.atualizarGrupo)
      .delete(GrupoService.eliminarGrupo);      


     
     
 module.exports = router;
