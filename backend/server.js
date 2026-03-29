const express = require('express')
const cors = require('cors')
require('dotenv').config()

const produtosRouter = require('./routes/produtos')
const pedidosRouter = require('./routes/pedidos')
const pagamentoRouter = require('./routes/pagamento')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/produtos', produtosRouter)
app.use('/api/pedidos', pedidosRouter)
app.use('/api/pagamento', pagamentoRouter)

app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor SupriMais funcionando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
