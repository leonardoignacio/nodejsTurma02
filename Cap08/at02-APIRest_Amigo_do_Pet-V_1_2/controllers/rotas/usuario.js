const model = new require('../../models/usuario')
const auth = require('../auth')
const validacao = require('../validacao')
const rota = 'usuarios'
module.exports = (app)=>{
    app.get(`/consultar/${rota}`, auth.validarToken, async (req, res)=>{ //rota protegida
        try {
           
            let id=req.usuarioAtual.id  //Alterar
            let dados = await model.findByPk(id)
            delete dados.dataValues.senha
            res.json(dados).status(200)
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.post(`/cadastrar/${rota}`, async (req, res)=>{
        try {
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
            
        } catch (error) {
            res.json(error).status(422)
        }
    })
    app.put(`/atualizar/${rota}`, auth.validarToken, async (req, res) => {
        try {
            let id = req.usuarioAtual.id //alterar
            let {nome, cpf, telefone, whatsapp} = req.body
            //Para evitar atualizaçção de dados de Login, atualizar estes dados exigem regras específicas de validação
            let dados = {nome:nome, cpf:cpf, telefone:telefone, whatsapp:whatsapp}
            let respBd = await model.update(dados, {where:{id:id}})
            res.json(respBd).status(200)            
        } catch (error) {
            res.json(error).status(400)
        }
    })
    app.delete(`/excluir/${rota}`, auth.validarToken, async (req, res) => {
        try {
            let id = req.usuarioAtual.id //alterar
            //A exclusão de registro exigem regras específicas de validação além deste escopo
            let respBd = await model.destroy({where:{id:id}})
            res.json(respBd)
        } catch (error) {
            res.json(error).status(400)
        }
    })
}