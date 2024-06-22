const model = new require('../../models/usuario')
const auth = require('../auth')
const validacao = require('../validacao')
const rota = 'usuarios'
const bcrypt = require('bcryptjs')
module.exports = (app)=> {
    app.get(`/${rota}/:id?`, async (req, res)=>{
        let dados = req.params.id? await model.findOne({where:{id:req.params.id}}) : await model.findAll()
        res.json(dados).status(200)
    })
    app.post(`/${rota}`, async (req, res)=>{
        let dados = req.body
        let dadosLogin = await validacao.validarCadastro(dados, model)
        if (dadosLogin.validacao){
            dados.senha = await auth.criptografarSenha(dados.senha)
            let respBd = await model.create(dados)
            delete respBd.dataValues.senha
            res.json(respBd).status(201)
        } else {
            res.json(dadosLogin).status(200)
        }

    }) 
    app.put(`/${rota}/:id`, auth.validarToken, async (req, res) => {
            let id = req.params.id
            let dados = req.body
            let respBd = await model.update(dados, {where:{id:id}})
            res.json(respBd)
    })
    app.delete(`/${rota}/:id`, auth.validarToken, async (req, res) => {
        try {
            let id = req.params.id
            let respBd = await model.destroy({where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
}
