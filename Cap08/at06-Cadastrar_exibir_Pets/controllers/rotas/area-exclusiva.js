const requests = require('../requests')
module.exports =(app)=>{
    
    app.get('/area-exclusiva', async (req, res)=>{        
       try {
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
                dados.meusDados = await requests.requisicaoGet(`consultar/usuarios`, `Bearer ${token}`)
                dados.meusPets = await requests.requisicaoGet(`obter/pets`, `Bearer ${token}`)
                dados.meusInteresses = await requests.requisicaoGet(`consultar/doacoes`, `Bearer ${token}`)
                dados.meusInteresses = await requests.requisicaoGet(`consultar/doacoes`, `Bearer ${token}`)
                meusInteresses = await requests.requisicaoGet(`consultar/doacoes`, `Bearer ${token}`)
                dados.meusInteresses = meusInteresses.map(m=>m.pet)
                res.render('area_exclusiva', {dados})
            }
        }
       } catch (error) {
        res.render('login',{dados:{message:'Sessão expirou. Faça login!'}}) 
       }
    }),
    app.post("/interesse", async (req, res)=>{
        let dados = {}
        if (req.headers.cookie==='Authorization=' || req.headers.cookie===''){
            dados.autenticado=false
            dados.token=undefined
            res.render('login',{dados:{message:'Sessão expirou. Faça login!'}})    
        } else {
            const token = req.headers.cookie.split('=')[1]
            if (token!==undefined){
                dados = req.body
                dados.status = 'Andamento'
                let resp = await requests.requisicaoPost(`cadastrar/doacoes`, dados, `Bearer ${token}`)
                dados.message=resp.message
                dados.autenticado=true
                dados.token=token
                res.json(resp)
            }
        }
    })
}