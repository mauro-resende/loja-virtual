import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Produtos() {
  const { adicionar } = useCart()
  const navigate = useNavigate()
  const [produtos, setProdutos] = useState([])
  const [adicionado, setAdicionado] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/produtos`)
      .then(res => res.json())
      .then(data => {
        setProdutos(data)
        setLoading(false)
      })
  }, [])

  function handleAdicionar(e, produto) {
    e.stopPropagation()
    adicionar(produto)
    setAdicionado(produto.id)
    setTimeout(() => setAdicionado(null), 2000)
  }

  function calcularParcela(preco) {
    return (parseFloat(preco) / 10).toFixed(2)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Carregando produtos...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Nossos Produtos</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{produtos.length} produtos disponíveis</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map(p => (
          <div key={p.id} onClick={() => navigate(`/produtos/${p.id}`)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

            <div className="relative bg-gray-100 dark:bg-gray-700 aspect-square overflow-hidden">
              <img src={p.imagem} alt={p.nome}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={e => {
                  e.target.onerror = null
                  e.target.src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=${encodeURIComponent(p.nome)}`
                }}
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Em estoque
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1 leading-tight">{p.nome}</h2>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
                <span className="text-gray-400 text-xs">(24)</span>
              </div>
              <div className="mb-3">
                <p className="text-2xl font-bold text-blue-600">R$ {parseFloat(p.preco).toFixed(2)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">ou 10x de R$ {calcularParcela(p.preco)} sem juros</p>
              </div>
              <p className="text-xs text-green-600 font-semibold mb-4">🚀 Entrega rápida disponível</p>

              <button onClick={e => handleAdicionar(e, p)}
                className={`w-full py-2.5 rounded-lg font-bold text-white transition-all mt-auto ${
                  adicionado === p.id ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                {adicionado === p.id ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
              </button>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-400 text-center mb-2">Pagamento seguro via</p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">VISA</span>
                  <span className="text-xs font-bold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-2 py-1 rounded">Master</span>
                  <span className="text-xs font-bold bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 px-2 py-1 rounded">ELO</span>
                  <span className="text-xs font-bold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">PIX</span>
                  <span className="text-xs font-bold bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">Boleto</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-gray-100 dark:border-gray-700 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4"><p className="text-2xl mb-2">🔒</p><p className="text-sm font-bold text-gray-700 dark:text-gray-300">Compra Segura</p><p className="text-xs text-gray-400">Dados protegidos</p></div>
          <div className="p-4"><p className="text-2xl mb-2">🚀</p><p className="text-sm font-bold text-gray-700 dark:text-gray-300">Entrega Rápida</p><p className="text-xs text-gray-400">Motoboy no mesmo dia</p></div>
          <div className="p-4"><p className="text-2xl mb-2">↩️</p><p className="text-sm font-bold text-gray-700 dark:text-gray-300">Troca Garantida</p><p className="text-xs text-gray-400">7 dias para trocar</p></div>
          <div className="p-4"><p className="text-2xl mb-2">💳</p><p className="text-sm font-bold text-gray-700 dark:text-gray-300">Parcelamento</p><p className="text-xs text-gray-400">Em até 10x sem juros</p></div>
        </div>
      </div>
    </div>
  )
}
