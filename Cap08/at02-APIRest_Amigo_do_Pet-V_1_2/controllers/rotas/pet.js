const model = new require('../../models/pet')
const usuario = new require('../../models/usuario')
const auth = require('../auth')
const rota = 'pets'
module.exports = (app)=>{
    app.get(`/consultar/${rota}/:id?`, async (req, res)=>{
        try {
            let dados = req.params.id? await model.findOne({where:{id:req.params.id}}) : //Alterar
            await model.findAll({include:[{model:usuario}]}, {raw: true, order:[['id','DESC']]})
            res.json(dados).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.get(`/obter/${rota}`, auth.validarToken, async (req, res) => { //Criar esta nova rota
        
        try {
            let id=parseInt(req.usuarioAtual.id) //Alterar
            let dados = await model.findAll({where:{usuarioId:id}}, {raw: true, order:[['id','DESC']]})
            res.json(dados).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    }),
    app.post(`/cadastrar/${rota}`, auth.validarToken, async (req, res)=>{
        try {
            let dados = req.body
            dados.usuarioId=req.usuarioAtual.id //Adiciona o Id do usuario autenticado
            let respBd = await model.create(dados)
            res.json(respBd).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.put(`/atualizar/${rota}`, auth.validarToken, async (req, res) => {
        try {
            let id = req.usuarioAtual.id //Alterar
            let dados = req.body
            let respBd = await model.update(dados, {where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.delete(`/excluir/${rota}`, auth.validarToken, async (req, res) => {
        try {
            let id = req.usuarioAtual.id //Alterar
            let respBd = await model.destroy({where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
}