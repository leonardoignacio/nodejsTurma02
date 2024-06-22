const auth = require('./auth')
module.exports ={
    validarCadastro: async(dados, model)=>{
        let usuario = await model.findOne({where:{email:dados.email}})
        if (usuario!=null){ //Verifica se o email já está cadastrado
            return {erro:'e-mail inválido', message:'Email já cadastrado!'}
        }
        if (dados.senha != dados.confirmacao){//Verifica a confirmação da senha
            return {erro:'senha', message:'Senha e confirmação não conhecidem!'}
        }
        return {validacao:true}
    },
    validarLogin: async (dados, model)=>{
        let usuario = await model.findOne({where:{email:dados.email}})
        if (usuario==null){
            return {message:'Conta inválida!', autenticado:false}
        } else {
            let authSenha = await auth.validarSenha(dados.senha, usuario.senha)
            return authSenha? {usuario, autenticado:true}:{erro:{message:'Senha inválida'}, autenticado:false}
        }
    }
}