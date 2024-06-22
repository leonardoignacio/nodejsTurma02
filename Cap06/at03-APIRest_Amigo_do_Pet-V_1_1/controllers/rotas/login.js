const model = new require('../../models/usuario')
const auth = require('../auth')
const validacao = require('../validacao')
module.exports = (app)=>{
    app.post(`/login`, async (req, res)=>{
        let dados = req.body
        let validaLogin = await validacao.validarLogin(dados, model)
        if(validaLogin.autenticado){//Verifica se email e senha são consistentes
            let {id, nome, email} = validaLogin.usuario.dataValues
            dados = {id, nome, email} //Desestruturação dos dados validados
            let token = await auth.gerarToken(dados) //Gera um token JWT
            return res.json({dados, autenticado:true, token:token}).status(200)
        } else{
            return res.json(validaLogin).status(200)
        }
    })

}