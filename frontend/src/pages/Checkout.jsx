import { useCart } from '../context/CartContext'
import { useState } from 'react'

const API = 'https://loja-virtual-production-6241.up.railway.app'

const ORDER_BUMP = {
  id: 'bump-1',
  nome: 'Kit Proteção Premium',
  descricao: 'Capa protetora + película de vidro temperado. Complemento perfeito para seu pedido!',
  preco: 29.90,
  quantidade: 1
}

export default function Checkout() {
  const { itens, total } = useCart()
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '',
    cep: '', endereco: '', numero: '', cidade: '', estado: ''
  })
  const [pagamento, setPagamento] = useState('pix')
  const [enviando, setEnviando] = useState(false)
  const [aceitouBump, setAceitouBump] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function totalFinal() {
    return total() + (aceitouBump ? ORDER_BUMP.preco : 0)
  }

  async function handleConfirmar() {
    setEnviando(true)
    const itensFinal = aceitouBump ? [...itens, ORDER_BUMP] : itens
    try {
      await fetch(`${API}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pagamento, total: totalFinal(), itens: itensFinal })
      })

      const resPagamento = await fetch(`${API}/api/pagamento/criar-preferencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itens: itensFinal,
          pagador: { nome: form.nome, email: form.email, telefone: form.telefone }
        })
      })

      const dados = await resPagamento.json()
      window.location.href = dados.url

    } catch (erro) {
      alert('Erro ao realizar pedido. Tente novamente.')
    }
    setEnviando(false)
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white">Finalizar Compra</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Dados Pessoais</h2>
            <div className="space-y-3">
              <input name="nome" placeholder="Nome completo" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input name="email" placeholder="E-mail" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input name="telefone" placeholder="Telefone" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Endereco de Entrega</h2>
            <div className="space-y-3">
              <input name="cep" placeholder="CEP" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input name="endereco" placeholder="Endereco" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <div className="grid grid-cols-2 gap-3">
                <input name="numero" placeholder="Numero" onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
                <input name="cidade" placeholder="Cidade" onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              </div>
              <input name="estado" placeholder="Estado" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Pagamento</h2>
            <div className="flex gap-3">
              {['pix', 'cartao', 'boleto'].map(op => (
                <button key={op} onClick={() => setPagamento(op)}
                  className={pagamento === op
                    ? 'flex-1 py-2 rounded-lg font-bold border-2 border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-600'
                    : 'flex-1 py-2 rounded-lg font-bold border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'}>
                  {op === 'pix' ? 'Pix' : op === 'cartao' ? 'Cartao' : 'Boleto'}
                </button>
              ))}
            </div>
          </div>

          {/* ORDER BUMP */}
          <div
            onClick={() => setAceitouBump(!aceitouBump)}
            className={`cursor-pointer border-2 rounded-xl p-5 transition-all ${
              aceitouBump
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={aceitouBump}
                onChange={() => setAceitouBump(!aceitouBump)}
                className="mt-1 w-5 h-5 accent-green-500"
                onClick={e => e.stopPropagation()}
              />
              <div>
                <p className="text-xs font-bold uppercase text-yellow-600 dark:text-yellow-400 mb-1">
                  Oferta especial — adicione ao seu pedido agora
                </p>
                <p className="font-bold text-gray-800 dark:text-white text-lg">{ORDER_BUMP.nome}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{ORDER_BUMP.descricao}</p>
                <p className="mt-2 text-green-600 dark:text-green-400 font-bold text-lg">
                  + R$ {ORDER_BUMP.preco.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Resumo do Pedido</h2>
            <div className="space-y-3 mb-6">
              {itens.map(item => (
                <div key={item.id} className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>{item.nome} x{item.quantidade}</span>
                  <span>R$ {(parseFloat(item.preco) * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              {aceitouBump && (
                <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                  <span>{ORDER_BUMP.nome} x1</span>
                  <span>R$ {ORDER_BUMP.preco.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-bold text-lg">
              <span className="text-gray-800 dark:text-white">Total</span>
              <span className="text-blue-600">R$ {totalFinal().toFixed(2)}</span>
            </div>
            <button onClick={handleConfirmar} disabled={enviando}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold disabled:opacity-50">
              {enviando ? 'Enviando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
