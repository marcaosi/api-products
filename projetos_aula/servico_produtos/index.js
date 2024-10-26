require('dotenv').config()
const express = require('express')
const mongodb = require('./src/database/mongo')
const rotas = require('./src/routes/produto')
const auth_middleware = require('./src/middlewares/auth')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

mongodb()

app.use('/produto', auth_middleware, rotas)


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))