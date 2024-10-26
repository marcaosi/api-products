const express = require('express')
const router = express.Router()
const Produto = require('../models/Produto')

router.post('/', async (req, res) => {
    try {
        const novoProduto = new Produto(req.body)
        const produtoSalvo = await novoProduto.save()
        res.status(201).json(produtoSalvo)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o produto' })
    }
})

router.get('/', async (req, res) => {
    try {
        const Produtos = await Produto.find()
        res.json(Produtos)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const Produto = await Produto.findById(req.params.id)
        if (!Produto) return res.status(404).json({ message: 'Produto não encontrado' })
        res.json(Produto)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o produto' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!produtoAtualizado) return res.status(404).json({ message: 'Produto não encontrado' })
        res.json(produtoAtualizado)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o produto' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const produtoExcluido = await Produto.findByIdAndDelete(req.params.id)
        if (!produtoExcluido) return res.status(404).json({ message: 'Produto não encontrado' })
        res.json({ message: 'Produto deletado com sucesso' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o produto' })
    }
})

module.exports = router