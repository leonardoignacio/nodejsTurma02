const axios = require('axios')
module.exports = {
    requisicaoGet: async (...dataReq) => {
        try {
            dataReq[0] = `${urlServer}/${dataReq[0]}`
            if (dataReq[1] !== undefined) {
                let config = {
                    headers: {
                        'Authorization': dataReq[1] // Adiciona o cabeçalho de autorização com o token
                    }
                }
                dataReq[1] = config
            }
            let resp = await axios.get(...dataReq)
            return resp.data
        } catch (error) {
            return { status: 400, message: 'A requisição não pode ser respondida!', erro: error }
        }
    },
    requisicaoPost: async (...dataReq) => {
        try {
            dataReq[0] = `${urlServer}/${dataReq[0]}`
            if (dataReq[2] !== undefined) {
                let config = {
                    headers: {
                        'Authorization': dataReq[2] // Adiciona o cabeçalho de autorização com o token
                    }
                }
                dataReq[2] = config
            }
            let resp = await axios.post(...dataReq)
            return resp.data
        } catch (error) {
            return { status: 400, message: 'A requisição não pode ser respondida!', erro: error }
        }
    },
    requisicaoPut: async (rota, dados, token) => {
        try {
            let uri = `${urlServer}/${rota}`
            let config = {
                headers: {
                    'Authorization': token // Adiciona o cabeçalho de autorização com o token
                }
            }
            let resp = await axios.put(uri, dados, config)
            return resp.data
        } catch (error) {
            return { status: 400, message: 'A requisição não pode ser respondida!', erro: error }
        }
    },
    requisicaoDelete: async (rota, token) => {
        try {
            let uri = `${urlServer}/${rota}`
            let config = {
                headers: {
                    'Authorization': token // Adiciona o cabeçalho de autorização com o token
                }
            }
            let resp = await axios.delete(uri, config)
            return resp.data
        } catch (error) {
            return { status: 400, message: 'A requisição não pode ser respondida!', erro: error }
        }
    },
    gravarCookie:(res, token)=>{
        res.cookie('Authorization', token, {
            //httpOnly: true,
            secure: true,
            sameSite: 'strict',
            //expires: new Date(Date.now() + 60 * 60 * 1000), //+1 hora com data/hra definida
            maxAge: 60 * 60 * 1000 //+1 hora em milesegundos
        })

    },
    excluirCookie: (res) => {
        //res.cookie('Authorization', 'undefined', {maxAge: 60 * 60 * 100000})
        res.cookie('Authorization', 'undefined', { expires: new Date(0) })

    }
}
