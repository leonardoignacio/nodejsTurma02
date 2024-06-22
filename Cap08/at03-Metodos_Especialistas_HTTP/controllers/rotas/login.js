const requests = require('../requests')
module.exports =(app)=>{  
    app.get(`/login`, async (req, res)=>res.render('login',{dados:{message:false}}))
    app.post('/login', async (req, res)=>{
        try {
            let dados = await requests.requisicaoPost('login', req.body)
            if (dados.autenticado){
                requests.gravarCookie(res, dados.token)
                res.render('area_exclusiva', {dados})
            } else{
                dados.status=401
                res.render('login', {dados})
            }
        } catch (error) {
            let dados={message:"Login Inválido!", status:401, erro:error}
            res.render('login', {dados})
        }
    })
    app.get('/logoff', async (req, res) => {
        try {
            console.log('/logoff')            
            requests.excluirCookie(res)
            res.render('index')
        } catch (error) {
            console.log('Erro:', error)
        }
    })
}