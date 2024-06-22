const auth = require('./auth')
module.exports = {
    validarCadastro: async(dados, model)=>{
        let usuario = await model.findOne({ where: { email: dados.email } })
        if (usuario!=null){//Verifica se o email já está cadastrado
            return {erro:'email inválido', message:"Email já cadastrado!"}
        }
        if (dados.senha != dados.confirmacao){ //verifica se a senha e a confirmação conferem
            return {erro:'senha', message:"Senhas não coincidem!"}
        }
        return {validacao:true} //retorna o status de validação verdadeiro
    },
    validarLogin: async (dados, model)=>{
        //Carrega os dados do banco
        let usuario = await model.findOne({ where: { email:dados.email }}) 
        if ( usuario==null){ //verifica se o email enviado pela requisição existe
            return {message:'Conta de email inválida.', autenticado:false}
        } else {
            //verifica se o hash da senha enviada confere com o hash do banco
            let authSenha = await auth.validarSenha(dados.senha, usuario.senha) 
            //usuario = authSenha? {...usuario} : {message:'Senha inválida'}
            return authSenha? {usuario, autenticado:true}:{message:'Senha inválida.', autenticado:false}
        }
       
    }
}