import express from 'express'

const app = express()

const PORT = Number(process.env.PORT) || 3000
const HOST = 'localhost'

app.get('/', (req, res)=> {
    return res.json([
        {id: 1, name: 'Anuncio 1'},
        {id: 2, name: 'Anuncio 2'},
        {id: 3, name: 'Anuncio 3'},
        {id: 4, name: 'Anuncio 4'}
    ])
})

app.listen(PORT, HOST, ()=> console.info(`Server is UP in ${HOST}:${PORT}`))