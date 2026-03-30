import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Produtos() {
  const { adicionar } = useCart()
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

  function handleAdicionar(produto) {
    adicionar(produto)
    setAdicionado(produto.id)
    setTimeout(() => setAdicionado(null), 2000)
  }

  if (loading) return <div className="text-center py-20 text-gray-500">Carregando produtos...</div>

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white">Nossos Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {produtos.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <img src={p.imagem} alt={p.nome} className="w-full" />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{p.nome}</h2>
              <p className="text-blue-600 font-bold text-xl mb-4">R$ {parseFloat(p.preco).toFixed(2)}</p>
              <button
                onClick={() => handleAdicionar(p)}
                className={adicionado === p.id
                  ? 'w-full py-2 rounded-lg font-bold text-white bg-green-500'
                  : 'w-full py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700'}
              >
                {adicionado === p.id ? 'Adicionado! ✓' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
