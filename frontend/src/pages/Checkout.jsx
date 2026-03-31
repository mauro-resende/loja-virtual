import { useCart } from '../context/CartContext'
import { useState } from 'react'

const API = 'https://loja-virtual-production-6241.up.railway.app'

const CUPONS = {
  BEMVINDO10: { desconto: 0.10, label: '10% de desconto' },
  VOLTA20:    { desconto: 0.20, label: '20% de desconto' },
  OLX15:      { desconto: 0.15, label: '15% de desconto' },
  FACEBOOK15: { desconto: 0.15, label: '15% de desconto' },
}

const ORDER_BUMP = {
  id: 'bump-1',
  nome: 'Kit Proteção Premium',
  descricao: 'Capa protetora + película de vidro temperado.',
  preco: 29.90,
  quantidade: 1
}

const OPCOES_ENTREGA = [
  { id: 'motoboy',  label: 'Entrega Rápida',    descricao: 'Motoboy — Hoje',    preco: 15.00, prazo: 'Hoje'    },
  { id: 'retirada', label: 'Retirada no Ponto', descricao: 'Retire você mesmo', preco: 0,     prazo: 'Grátis' },
  { id: 'correios', label: 'Correios PAC',       descricao: '5 a 7 dias úteis', preco: 20.00, prazo: '5-7 dias'},
]

export default function Checkout() {
  const { itens, total } = useCart()
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '',
    cep: '', endereco: '', numero: '', cidade: '', estado: ''
  })
  const [pagamento, setPagamento]     = useState('pix')
  const [entrega, setEntrega]         = useState(OPCOES_ENTREGA[0])
  const [enviando, setEnviando]       = useState(false)
  const [aceitouBump, setAceitouBump] = useState(false)
  const [cupomInput, setCupomInput]   = useState('')
  const [cupomAplicado, setCupomAplicado] = useState(null)
  const [cupomErro, setCupomErro]     = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function aplicarCupom() {
    const codigo = cupomInput.trim().toUpperCase()
    if (CUPONS[codigo]) {
      setCupomAplicado({ codigo, ...CUPONS[codigo] })
      setCupomErro('')
    } else {
      setCupomAplicado(null)
      setCupomErro('Cupom inválido ou expirado.')
    }
  }

  function removerCupom() {
    setCupomAplicado(null)
    setCupomInput('')
    setCupomErro('')
  }

  function valorDesconto() {
    if (!cupomAplicado) return 0
    return total() * cupomAplicado.desconto
  }

  function totalFinal() {
    return total() + entrega.preco + (aceitouBump ? ORDER_BUMP.preco : 0) - valorDesconto()
  }

  async function handleConfirmar() {
    setEnviando(true)
    const itensFinal = aceitouBump ? [...itens, ORDER_BUMP] : itens
    try {
      await fetch(`${API}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form, pagamento, entrega: entrega.id,
          cupom: cupomAplicado?.codigo || null,
          total: totalFinal(), itens: itensFinal
        })
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
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-3 space-y-5">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-base font-bold mb-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              1. Dados Pessoais
            </h2>
            <div className="space-y-3">
              <input name="nome" placeholder="Nome completo" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-2 gap-3">
                <input name="email" placeholder="E-mail" onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="telefone" placeholder="Telefone" onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-base font-bold mb-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              2. Endereço de Entrega
            </h2>
            <div className="space-y-3">
              <input name="cep" placeholder="CEP" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input name="endereco" placeholder="Endereço" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-3 gap-3">
                <input name="numero" placeholder="Número" onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="cidade" placeholder="Cidade" onChange={handleChange}
                  className="col-span-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <input name="estado" placeholder="Estado" onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-base font-bold mb-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              3. Forma de Entrega
            </h2>
            <div className="space-y-2">
              {OPCOES_ENTREGA.map(op => (
                <div key={op.id} onClick={() => setEntrega(op)}
                  className={`cursor-pointer rounded-lg border-2 px-4 py-3 flex justify-between items-center transition-all ${
                    entrega.id === op.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      entrega.id === op.id ? 'border-blue-600' : 'border-gray-400'
                    }`}>
                      {entrega.id === op.id && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{op.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{op.descricao}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${op.preco === 0 ? 'text-green-600' : 'text-gray-800 dark:text-white'}`}>
                    {op.preco === 0 ? 'Grátis' : `R$ ${op.preco.toFixed(2)}`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-base font-bold mb-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              4. Pagamento
            </h2>
            <div className="flex gap-3">
              {['pix', 'cartao', 'boleto'].map(op => (
                <button key={op} onClick={() => setPagamento(op)}
                  className={`flex-1 py-2.5 rounded-lg font-bold border-2 transition-all ${
                    pagamento === op
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-600'
                      : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400'
                  }`}>
                  {op === 'pix' ? '⚡ Pix' : op === 'cartao' ? '💳 Cartão' : '🧾 Boleto'}
                </button>
              ))}
            </div>
            {pagamento === 'pix' && (
              <p className="text-xs text-green-600 font-semibold mt-3">✅ Aprovação instantânea</p>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow sticky top-6 space-y-5">
            <h2 className="text-base font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Resumo do Pedido
            </h2>

            <div className="space-y-3">
              {itens.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.nome}</p>
                    <p className="text-xs text-gray-400">Qtd: {item.quantidade}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    R$ {(parseFloat(item.preco) * item.quantidade).toFixed(2)}
                  </span>
                </div>
              ))}
              {aceitouBump && (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-green-600">{ORDER_BUMP.nome}</p>
                    <p className="text-xs text-gray-400">Oferta especial</p>
                  </div>
                  <span className="text-sm font-bold text-green-600">R$ {ORDER_BUMP.preco.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* CUPOM */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              {!cupomAplicado ? (
                <div>
                  <div className="flex gap-2">
                    <input
                      value={cupomInput}
                      onChange={e => { setCupomInput(e.target.value); setCupomErro('') }}
                      onKeyDown={e => e.key === 'Enter' && aplicarCupom()}
                      placeholder="Cupom de desconto"
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={aplicarCupom}
                      className="px-4 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-lg text-sm font-bold hover:opacity-90 transition">
                      Aplicar
                    </button>
                  </div>
                  {cupomErro && <p className="text-red-500 text-xs mt-1">{cupomErro}</p>}
                </div>
              ) : (
                <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 border border-green-300 rounded-lg px-3 py-2">
                  <div>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">🏷️ {cupomAplicado.codigo}</p>
                    <p className="text-xs text-green-600">{cupomAplicado.label} aplicado!</p>
                  </div>
                  <button onClick={removerCupom} className="text-red-400 hover:text-red-600 text-xs font-bold">
                    Remover
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span>R$ {total().toFixed(2)}</span>
              </div>
              {cupomAplicado && (
                <div className="flex justify-between text-sm text-green-600 font-semibold">
                  <span>Desconto ({cupomAplicado.label})</span>
                  <span>- R$ {valorDesconto().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Frete ({entrega.label})</span>
                <span className={entrega.preco === 0 ? 'text-green-600 font-semibold' : ''}>
                  {entrega.preco === 0 ? 'Grátis' : `R$ ${entrega.preco.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800 dark:text-white">Total</span>
              <span className="font-bold text-2xl text-blue-600">R$ {totalFinal().toFixed(2)}</span>
            </div>

            {/* Order Bump */}
            <div onClick={() => setAceitouBump(!aceitouBump)}
              className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                aceitouBump ? 'ring-2 ring-green-500' : 'ring-2 ring-yellow-400'
              }`}
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1.5">
                <span className="text-white font-bold text-xs tracking-wide">🔥 OFERTA ESPECIAL — SÓ HOJE</span>
              </div>
              <div className={`p-4 transition-colors duration-300 ${
                aceitouBump ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/10'
              }`}>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={aceitouBump}
                    onChange={() => setAceitouBump(!aceitouBump)}
                    className="mt-1 w-4 h-4 accent-green-500 flex-shrink-0"
                    onClick={e => e.stopPropagation()} />
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white text-sm">{ORDER_BUMP.nome}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{ORDER_BUMP.descricao}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-gray-400 line-through text-xs">R$ 59,90</span>
                      <span className="text-green-600 font-bold">R$ {ORDER_BUMP.preco.toFixed(2)}</span>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">-50%</span>
                    </div>
                  </div>
                </div>
                {aceitouBump && (
                  <p className="text-center text-green-700 font-bold text-xs mt-3">✅ Adicionado ao pedido!</p>
                )}
              </div>
            </div>

            <button onClick={handleConfirmar} disabled={enviando}
              className="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition font-bold text-lg disabled:opacity-50 shadow-lg">
              {enviando ? 'Processando...' : '🔒 Confirmar Pedido'}
            </button>

            <p className="text-center text-xs text-gray-400">
              🔒 Pagamento 100% seguro via Mercado Pago
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
