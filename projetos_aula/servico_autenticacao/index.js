require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 8000
const usuarioRoutes = require('./src/routes/usuario')

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Serviço executando...")
})

app.use(usuarioRoutes)

app.listen(PORT, () => {
    console.log("Serviço executando na porta: " + PORT)
})