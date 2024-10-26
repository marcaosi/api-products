const express = require("express")
const schema = require('../schemas/usuario')
const { Usuario } = require('../models')
const encriptador = require('../services/EncriptadorDeSenhas')
const jwt = require('jsonwebtoken')
const Email = require('../services/Email')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const dados = req.body

    try{
        const usuario = schema.parse(dados)

        usuario.senha = await encriptador.encriptar(usuario.senha)

        const usuarioSalvo = await Usuario.create(usuario)

        return res.status(203).send({
            mensagem: "Usuário salvo com sucesso!",
            sucesso: true,
            id: usuarioSalvo.id
        })
    }catch(err){
        return res.status(400).send(err.errors || err.message)
    }
})

router.post('/signin', async (req, res) => {
    const {email, senha} = req.body

    const usuario = await Usuario.findOne({where: {email: email}})

    if(!usuario){
        return res.status(403).send({
            mensagem: "Usuário ou senha inválidos",
            sucesso: false
        })
    }

    const senhaValida = await encriptador.comparar(usuario.senha, senha)

    if(!senhaValida){
        return res.status(403).send({
            mensagem: "Usuário ou senha inválidos",
            sucesso: false
        })
    }

    // gerar JWT
    const payload = {
        dados: {
            email: usuario.email,
            nome: usuario.nome
        }
    }
    const token = jwt.sign(payload, process.env.KEY, { algorithm: 'HS256', expiresIn: 60*20 })

    return res.status(200).send({
        success: true,
        token: token
    })
})

router.post('/verifyToken', (req, res) => {
    const {token} = req.body

    try{
        const decoded = jwt.verify(token, process.env.KEY)

        return res.send({
            success: true,
            message: 'Token Válido',
            dados: decoded
        })
    }catch(err){
        return res.status(401).send({
            success: false,
            message: err.message
        })
    }    
})

router.post('/resetPwd', async (req, res) => {
    const {email} = req.body

    const nova_senha = Math.random().toString(36).slice(-6)

    const usuario = await Usuario.findOne({where: {email}})

    if(!usuario){
        return res.status(404).send()
    }

    await usuario.update({ senha: await encriptador.encriptar(nova_senha) })
    await usuario.save()

    const conteudo = `<p>Recebemos usa solicitação de senha</p><p>Sua nova senha é: ${nova_senha}</p>`

    await Email.enviarEmail(email, 'Redefinição de senha', conteudo)

    res.status(200).send({
        success: true,
        message: 'E-mail de redefinição de senha enviado.'
    })
})

module.exports = router