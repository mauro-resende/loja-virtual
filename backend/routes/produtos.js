const express = require('express')
const router = express.Router()
const pool = require('../db')

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM produtos ORDER BY id')
    res.json(resultado.rows)
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar produtos' })
  }
})

// Buscar produto por ID
router.get('/:id', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM produtos WHERE id = $1', [req.params.id])
    if (resultado.rows.length === 0) return res.status(404).json({ erro: 'Produto não encontrado' })
    res.json(resultado.rows[0])
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar produto' })
  }
})

// Adicionar produto
router.post('/', async (req, res) => {
  const { nome, descricao, preco, imagem, estoque } = req.body
  try {
    const resultado = await pool.query(
      'INSERT INTO produtos (nome, descricao, preco, imagem, estoque) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, descricao, preco, imagem, estoque]
    )
    res.status(201).json(resultado.rows[0])
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao adicionar produto' })
  }
})

module.exports = router
