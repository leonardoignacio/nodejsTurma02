const model = new require('../../models/doacao')
const usuario = new require('../../models/usuario')
const pet = new require('../../models/pet')
const auth = require('../auth')
const validacao = require('../validacao')
const rota = 'doacoes'
module.exports = (app)=>{
    app.get(`/consultar/${rota}`, auth.validarToken, async (req, res)=>{
        try {
            //alterar
            let dados = await model.findAll({where:{usuarioId:req.usuarioAtual.id}, include:[{model:pet}, {model:usuario}], raw:false, order:[['id','DESC']]})
            res.json(dados).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    }),
    app.get(`/obter/${rota}/:idPet`, auth.validarToken, async (req, res)=>{ //Criar esta nova rota
        try {
            let dados = await model.findAll({where:{petId:req.params.idPet}, include:[{model:usuario}], raw:false, order:[['id','DESC']]})
            res.json(dados).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    }),
    app.post(`/cadastrar/${rota}`, auth.validarToken, async (req, res)=>{
       try {  
            let resp = {}
            resp.message="Você não pode registrar interesse por seu próprio Pet."
            if (req.usuarioAtual.id !== req.body.idUsuario ){
                let dados=req.body
                dados = req.body
                resp = await model.create(dados)
                resp = resp.dataValues
                resp.message='Registro de interesse efetuado com sucesso!'
            }
            res.json(resp).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.put(`/atualizar/${rota}/:id`, auth.validarToken, async (req, res) => {
        try {
            let id = req.params.id
            let dados = req.body
            let respBd = await model.update(dados, {where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.delete(`/excluir/${rota}/:id`, auth.validarToken, async (req, res) => {
        try {
            let id = req.params.id
            let respBd = await model.destroy({where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
}