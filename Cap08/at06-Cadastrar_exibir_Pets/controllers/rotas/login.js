const requests = require('../requests')
module.exports =(app)=>{  
    app.get(`/login`, async (req, res)=>res.render('login',{dados:{message:false}}))
    app.post('/login', async (req, res)=>{
        try {
            let dados = await requests.requisicaoPost('login', req.body)
            if (dados.autenticado){
                res.cookie('Authorization', dados.token, {
                    //httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    //expires: new Date(Date.now() + 60 * 60 * 1000), //+1 hora com data/hra definida
                    maxAge: 60 * 60 * 1000 //+1 hora em milesegundos
                })
                dados.meusDados = await requests.requisicaoGet(`consultar/usuarios`, `Bearer ${dados.token}`)
                dados.meusPets = await requests.requisicaoGet(`obter/pets`, `Bearer ${dados.token}`)
                meusInteresses = await requests.requisicaoGet(`consultar/doacoes`, `Bearer ${dados.token}`)
                dados.meusInteresses = meusInteresses.map(m=>m.pet)
                res.render('area_exclusiva', {dados})
               } else {
                dados.status=401
                res.render('login', {dados})
               }
        } catch (error) {
            console.log(error)
            let dados={message:"Login Inválido!", status:401, erro:error}
            res.render('login', {dados})
        }
    })
    app.get('/logoff', async (req, res) => {
        try {
            requests.excluirCookie(res)
            res.render('index')
        } catch (error) {
            console.log('Erro:', error)
        }
    })
}