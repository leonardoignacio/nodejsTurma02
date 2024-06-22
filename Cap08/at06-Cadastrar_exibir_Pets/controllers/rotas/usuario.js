const requests = require('../requests')
module.exports =(app)=>{
    app.get(`/novo-usuario`, async (req, res)=>res.render('novo_usuario')),
    app.post('/novo-usuario', async (req, res)=>{
        try {
            let dados = await requests.requisicaoPost('cadastrar/usuarios', req.body)
            res.render('confirmacao', dados)
       } catch (error) {
            //console.log(error)
            let dados={message:"Não foi possível realizar o cadastro.", status:401, erro:error}
            res.render('login', dados)
        }
    }),
    app.post('/editar-perfil', async(req, res) => {
        let dados={}
        if (req.headers.cookie==='Authorization=' || req.headers.cookie===''){
            dados.autenticado=false
            dados.token=undefined
            res.render('login',{dados:{message:'Sessão expirou. Faça login!'}})    
        } else {
            const token = req.headers.cookie.split('=')[1]
            if (token!==undefined){
                dados.autenticado=true
                dados.token=token
                
                //Realiza a atualização na API
                let respApi = await requests.requisicaoPut('atualizar/usuarios', req.body, `Bearer ${dados.token}`)
                dados.message=respApi>0?"Dados atualizados com sucesso!":"Os dados não puderam ser gravados."
                dados.alert=respApi>0?"success":"danger"

                //Atualizar dados e recarregar página
                dados.meusDados = await requests.requisicaoGet(`consultar/usuarios`, `Bearer ${dados.token}`)
                dados.meusPets = await requests.requisicaoGet(`obter/pets`, `Bearer ${dados.token}`)
                meusInteresses = await requests.requisicaoGet(`consultar/doacoes`, `Bearer ${dados.token}`)
                dados.meusInteresses = meusInteresses.map(m=>m.pet)
                
                res.render('area_exclusiva', {dados})
                //res.redirect('/area-exclusiva')
            }
        }
        
    })
}