const express = require('express')
const router = express.Router()
const { MercadoPagoConfig, Preference } = require('mercadopago')

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

router.post('/criar-preferencia', async (req, res) => {
  const { itens, pagador } = req.body

  try {
    const preference = new Preference(client)

    const resultado = await preference.create({
      body: {
        items: itens.map(item => ({
          title: item.nome,
          quantity: item.quantidade,
          unit_price: parseFloat(item.preco),
          currency_id: 'BRL'
        })),
        payer: {
          name: pagador.nome,
          email: pagador.email,
          phone: { number: pagador.telefone }
        },
        back_urls: {
          success: 'http://localhost:5173/pedido-confirmado',
          failure: 'http://localhost:5173/checkout',
          pending: 'http://localhost:5173/pedido-confirmado'
        }
      }
    })

    console.log('Resultado MP:', JSON.stringify(resultado))
    res.json({ url: resultado.init_point || resultado.sandbox_init_point })

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao criar preferência de pagamento' })
  }
})

module.exports = router
