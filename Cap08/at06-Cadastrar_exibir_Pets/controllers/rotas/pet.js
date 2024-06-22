const requests = require('../requests')
module.exports =(app)=>{
    app.post('/novo-pet', async(req, res) => {
        let dados={}
        if (req.headers.cookie==='Authorization=' || req.headers.cookie===''){
            dados.autenticado=false
            dados.token=undefined
            res.render('login',{dados:{message:'Sessão expirou. Faça login!'}})    
        } else {
            const token = req.headers.cookie.split('=')[1]
            if (token!==undefined){
                let resp = await requests.requisicaoPost('cadastrar/pets', req.body, `Bearer ${token}`)              
                dados.message=resp?"Dados gravados com sucesso!":"Os dados não puderam ser gravados."
                dados.alert=resp?"success":"danger"
                dados.autenticado=true
                dados.token=token
                dados.meusDados = await requests.requisicaoGet(`consultar/usuarios`, `Bearer ${token}`)
                dados.meusPets = await requests.requisicaoGet(`obter/pets`, `Bearer ${token}`)
                meusInteresses = await requests.requisicaoGet(`consultar/doacoes`, `Bearer ${token}`)
                dados.meusInteresses = meusInteresses.map(m=>m.pet)
                res.render('area_exclusiva', {dados})
                //res.redirect('/area-exclusiva')
            }
        }
        
    })
}