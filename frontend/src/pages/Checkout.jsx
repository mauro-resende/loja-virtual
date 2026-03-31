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

const OPCOES_ENTREGA = [
  { id: 'motoboy', label: 'Entrega Rápida', descricao: 'Motoboy — Hoje', preco: 15.00, prazo: 'Hoje' },
  { id: 'retirada', label: 'Retirada no Ponto', descricao: 'Retire você mesmo', preco: 0, prazo: 'Grátis' },
  { id: 'correios', label: 'Correios PAC', descricao: '5 a 7 dias úteis', preco: 20.00, prazo: '5-7 dias' },
]

export default function Checkout() {
  const { itens, total } = useCart()
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '',
    cep: '', endereco: '', numero: '', cidade: '', estado: ''
  })
  const [pagamento, setPagamento] = useState('pix')
  const [entrega, setEntrega] = useState(OPCOES_ENTREGA[0])
  const [enviando, setEnviando] = useState(false)
  const [aceitouBump, setAceitouBump] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function totalFinal() {
    return total() + entrega.preco + (aceitouBump ? ORDER_BUMP.preco : 0)
  }

  async function handleConfirmar() {
    setEnviando(true)
    const itensFinal = aceitouBump ? [...itens, ORDER_BUMP] : itens
    try {
      await fetch(`${API}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pagamento, entrega: entrega.id, total: totalFinal(), itens: itensFinal })
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

          {/* DADOS PESSOAIS */}
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

          {/* ENDEREÇO */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Endereço de Entrega</h2>
            <div className="space-y-3">
              <input name="cep" placeholder="CEP" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input name="endereco" placeholder="Endereço" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <div className="grid grid-cols-2 gap-3">
                <input name="numero" placeholder="Número" onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
                <input name="cidade" placeholder="Cidade" onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              </div>
              <input name="estado" placeholder="Estado" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            </div>
          </div>

          {/* ENTREGA */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Entrega</h2>
            <div className="space-y-3">
              {OPCOES_ENTREGA.map(op => (
                <div
                  key={op.id}
                  onClick={() => setEntrega(op)}
                  className={`cursor-pointer rounded-lg border-2 px-4 py-3 flex justify-between items-center transition-all ${
                    entrega.id === op.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">{op.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{op.descricao}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${op.preco === 0 ? 'text-green-600' : 'text-gray-800 dark:text-white'}`}>
                      {op.preco === 0 ? 'Grátis' : `R$ ${op.preco.toFixed(2)}`}
                    </p>
                    <p className="text-xs text-gray-400">{op.prazo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAGAMENTO */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Pagamento</h2>
            <div className="flex gap-3">
              {['pix', 'cartao', 'boleto'].map(op => (
                <button key={op} onClick={() => setPagamento(op)}
                  className={pagamento === op
                    ? 'flex-1 py-2 rounded-lg font-bold border-2 border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-600'
                    : 'flex-1 py-2 rounded-lg font-bold border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'}>
                  {op === 'pix' ? 'Pix' : op === 'cartao' ? 'Cartão' : 'Boleto'}
                </button>
              ))}
            </div>
          </div>

          {/* ORDER BUMP */}
          <div
            onClick={() => setAceitouBump(!aceitouBump)}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
              aceitouBump ? 'ring-2 ring-green-500' : 'ring-2 ring-yellow-400'
            }`}
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2">
              <span className="text-white font-bold text-sm tracking-wide">
                🔥 OFERTA ESPECIAL — SÓ HOJE
              </span>
            </div>
            <div className={`p-5 transition-colors duration-300 ${
              aceitouBump ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/10'
            }`}>
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={aceitouBump}
                  onChange={() => setAceitouBump(!aceitouBump)}
                  className="mt-1 w-5 h-5 accent-green-500 flex-shrink-0"
                  onClick={e => e.stopPropagation()}
                />
                <div className="text-4xl flex-shrink-0">🛡️</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-white text-lg">{ORDER_BUMP.nome}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">4.9 · 238 avaliações</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{ORDER_BUMP.descricao}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-gray-400 line-through text-sm">R$ 59,90</span>
                    <span className="text-green-600 dark:text-green-400 font-bold text-xl">R$ {ORDER_BUMP.preco.toFixed(2)}</span>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">-50%</span>
                  </div>
                  <p className="text-green-600 text-xs font-semibold mt-1">💰 Você economiza R$ 30,00</p>
                </div>
              </div>
              {aceitouBump && (
                <div className="mt-4 bg-green-100 dark:bg-green-800/30 rounded-lg px-4 py-2 text-center">
                  <span className="text-green-700 dark:text-green-300 font-bold text-sm">✅ Adicionado ao seu pedido!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RESUMO */}
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Resumo do Pedido</h2>
            <div className="space-y-3 mb-4">
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
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                <span>Frete ({entrega.label})</span>
                <span className={entrega.preco === 0 ? 'text-green-600 font-semibold' : ''}>
                  {entrega.preco === 0 ? 'Grátis' : `R$ ${entrega.preco.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-1">
                <span className="text-gray-800 dark:text-white">Total</span>
                <span className="text-blue-600">R$ {totalFinal().toFixed(2)}</span>
              </div>
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
