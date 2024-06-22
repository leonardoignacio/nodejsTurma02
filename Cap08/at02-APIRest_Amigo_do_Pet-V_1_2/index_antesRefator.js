const express = require('express')
const app = express()
const usuario = new require('./models/usuario')
const pet = new require('./models/pet')
const doacao = new require('./models/doacao')

var porta = '3200'

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res)=>res.send('API - Amigo do Pet'))

app.get('/consultar/usuarios/:id?', async (req, res)=>{
    try {
        let dados = req.params.id? await usuario.findOne({where:{id:req.params.id}}) : await usuario.findAll()
        res.json(dados).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})
app.post('/cadastar/usuarios', async (req, res)=>{
    try {
        let dados = req.body
        let respBd = await usuario.create(dados)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(error).status(400)
    }
})
app.put('/atualizar/usuarios/:id', async (req, res) => {
    try {
        let id = req.params.id
        let dados = req.body
        let respBd = await usuario.update(dados, {where:{id:id}})
        res.json(respBd)
    } catch (error) {
        res.json(error).status(400)
    }
})
app.delete('/excluir/usuarios/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respBd = await usuario.destroy({where:{id:id}})
        res.json(respBd)
    } catch (error) {
        res.json(error).status(400)
    }
})

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`))