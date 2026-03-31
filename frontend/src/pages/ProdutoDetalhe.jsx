import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProdutoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { adicionar } = useCart()
  const [produto, setProduto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adicionado, setAdicionado] = useState(false)
  const [quantidade, setQuantidade] = useState(1)
  const [imgAtiva, setImgAtiva] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/produtos/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduto(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  function handleAdicionar() {
    adicionar({ ...produto, quantidade })
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 2000)
  }

  function handleComprarAgora() {
    adicionar({ ...produto, quantidade })
    navigate('/checkout')
  }

  function calcularParcela(preco) {
    return (parseFloat(preco) / 10).toFixed(2)
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!produto) return (
    <div className="text-center py-20">
      <p className="text-gray-500">Produto não encontrado.</p>
      <button onClick={() => navigate('/produtos')} className="mt-4 text-blue-600 underline">
        Voltar aos produtos
      </button>
    </div>
  )

  const imagens = produto.imagens || [produto.imagem]

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-blue-600">Início</button>
        <span>/</span>
        <button onClick={() => navigate('/produtos')} className="hover:text-blue-600">Produtos</button>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">{produto.nome}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* IMAGENS */}
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden aspect-square">
            <img
              src={imagens[imgAtiva] || produto.imagem}
              alt={produto.nome}
              className="w-full h-full object-cover"
              onError={e => {
                e.target.onerror = null
                e.target.src = `https://placehold.co/600x600/e2e8f0/94a3b8?text=${encodeURIComponent(produto.nome)}`
              }}
            />
          </div>
          {imagens.length > 1 && (
            <div className="flex gap-3">
              {imagens.map((img, i) => (
                <button key={i} onClick={() => setImgAtiva(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    imgAtiva === i ? 'border-blue-600' : 'border-gray-200 dark:border-gray-700'
                  }`}>
                  <img src={img} alt="" className="w-full h-full object-cover"
                    onError={e => { e.target.src = `https://placehold.co/80x80/e2e8f0/94a3b8?text=${i+1}` }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETALHES */}
        <div className="space-y-5">
          <div>
            <p className="text-xs text-green-600 font-bold uppercase tracking-wide mb-1">✓ Em estoque</p>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white leading-tight">{produto.nome}</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">4.9 · 24 avaliações</span>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <p className="text-4xl font-bold text-blue-600">
              R$ {parseFloat(produto.preco).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              ou <strong>10x de R$ {calcularParcela(produto.preco)}</strong> sem juros
            </p>
            <p className="text-sm text-green-600 font-semibold mt-1">
              💰 5% de desconto no Pix
            </p>
          </div>

          {produto.descricao && (
            <div>
              <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">Descrição</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{produto.descricao}</p>
            </div>
          )}

          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Quantidade</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg border-2 border-gray-300 dark:border-gray-600 font-bold text-gray-600 dark:text-gray-300 hover:border-blue-500 transition">
                −
              </button>
              <span className="w-8 text-center font-bold text-gray-800 dark:text-white">{quantidade}</span>
              <button onClick={() => setQuantidade(q => q + 1)}
                className="w-9 h-9 rounded-lg border-2 border-gray-300 dark:border-gray-600 font-bold text-gray-600 dark:text-gray-300 hover:border-blue-500 transition">
                +
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={handleComprarAgora}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition text-lg shadow-lg">
              ⚡ Comprar Agora
            </button>
            <button onClick={handleAdicionar}
              className={`w-full py-3.5 rounded-xl font-bold transition text-lg border-2 ${
                adicionado
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}>
              {adicionado ? '✓ Adicionado ao carrinho!' : '🛒 Adicionar ao Carrinho'}
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="font-bold text-gray-700 dark:text-gray-300 text-sm">Opções de entrega</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>🛵</span><span><strong>Motoboy</strong> — entrega hoje</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>📦</span><span><strong>Retirada no ponto</strong> — grátis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>🚚</span><span><strong>Correios PAC</strong> — 5 a 7 dias úteis</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">🔒 Compra segura</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">↩️ 7 dias para troca</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">💳 Mercado Pago</span>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <p className="text-xs text-gray-400 mb-2">Formas de pagamento</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 px-2 py-1 rounded">VISA</span>
              <span className="text-xs font-bold bg-red-50 dark:bg-red-900/30 text-red-600 px-2 py-1 rounded">Master</span>
              <span className="text-xs font-bold bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 px-2 py-1 rounded">ELO</span>
              <span className="text-xs font-bold bg-green-50 dark:bg-green-900/30 text-green-700 px-2 py-1 rounded">PIX</span>
              <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 px-2 py-1 rounded">Boleto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
