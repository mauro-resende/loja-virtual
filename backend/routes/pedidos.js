const express = require('express')
const router = express.Router()
const pool = require('../db')

// Criar pedido
router.post('/', async (req, res) => {
  const { nome, email, telefone, cep, endereco, numero, cidade, estado, pagamento, total, itens } = req.body

  try {
    // Salva o pedido
    const pedido = await pool.query(
      `INSERT INTO pedidos (nome, email, telefone, cep, endereco, numero, cidade, estado, pagamento, total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [nome, email, telefone, cep, endereco, numero, cidade, estado, pagamento, total]
    )

    const pedidoId = pedido.rows[0].id

    // Salva os itens do pedido
    for (const item of itens) {
      await pool.query(
        `INSERT INTO pedido_itens (pedido_id, produto_id, nome, preco, quantidade)
         VALUES ($1, $2, $3, $4, $5)`,
        [pedidoId, item.id, item.nome, item.preco, item.quantidade]
      )
    }

    res.status(201).json({ mensagem: 'Pedido criado com sucesso!', pedido: pedido.rows[0] })
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao criar pedido' })
  }
})

// Listar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM pedidos ORDER BY criado_em DESC')
    res.json(resultado.rows)
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar pedidos' })
  }
})

module.exports = router
