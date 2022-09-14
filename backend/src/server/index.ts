import express from 'express'
import { routes } from './routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)


const PORT = Number(process.env.PORT) || 3000

const HOST = 'localhost'


app.listen(PORT, HOST, ()=> console.info(`Server is UP in ${HOST}:${PORT}`))