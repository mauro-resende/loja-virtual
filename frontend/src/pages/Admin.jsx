import { useState, useEffect } from 'react'

export default function Admin() {
  const [aba, setAba] = useState('pedidos')
  const [pedidos, setPedidos] = useState([])
  const [produtos, setProdutos] = useState([])
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', imagem: '', estoque: '' })

  useEffect(() => {
    fetch('http://localhost:3000/api/pedidos')
      .then(res => res.json())
      .then(data => setPedidos(data))

    fetch('http://localhost:3000/api/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data))
  }, [])

  async function handleAdicionarProduto() {
    const res = await fetch('http://localhost:3000/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto)
    })
    const data = await res.json()
    setProdutos([...produtos, data])
    setNovoProduto({ nome: '', descricao: '', preco: '', imagem: '', estoque: '' })
    alert('Produto adicionado!')
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Painel Admin</h1>

      {/* Abas */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setAba('pedidos')}
          className={`px-6 py-2 rounded-lg font-bold ${aba === 'pedidos' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}>
          Pedidos
        </button>
        <button onClick={() => setAba('produtos')}
          className={`px-6 py-2 rounded-lg font-bold ${aba === 'produtos' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}>
          Produtos
        </button>
      </div>

      {/* Aba Pedidos */}
      {aba === 'pedidos' && (
        <div className="space-y-4">
          {pedidos.length === 0 && <p className="text-gray-500">Nenhum pedido ainda.</p>}
          {pedidos.map(p => (
            <div key={p.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-gray-800 dark:text-white">Pedido #{p.id} — {p.nome}</h2>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">{p.status}</span>
              </div>
              <p className="text-gray-500 text-sm">{p.email} | {p.telefone}</p>
              <p className="text-gray-500 text-sm">{p.endereco}, {p.numero} — {p.cidade}/{p.estado}</p>
              <p className="text-gray-500 text-sm">Pagamento: {p.pagamento}</p>
              <p className="text-blue-600 font-bold mt-2">Total: R$ {parseFloat(p.total).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Aba Produtos */}
      {aba === 'produtos' && (
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Adicionar Produto</h2>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Nome" value={novoProduto.nome} onChange={e => setNovoProduto({...novoProduto, nome: e.target.value})}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input placeholder="Preco" value={novoProduto.preco} onChange={e => setNovoProduto({...novoProduto, preco: e.target.value})}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input placeholder="Descricao" value={novoProduto.descricao} onChange={e => setNovoProduto({...novoProduto, descricao: e.target.value})}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input placeholder="URL da Imagem" value={novoProduto.imagem} onChange={e => setNovoProduto({...novoProduto, imagem: e.target.value})}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
              <input placeholder="Estoque" value={novoProduto.estoque} onChange={e => setNovoProduto({...novoProduto, estoque: e.target.value})}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white" />
            </div>
            <button onClick={handleAdicionarProduto}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold">
              Adicionar Produto
            </button>
          </div>

          <div className="space-y-4">
            {produtos.map(p => (
              <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center gap-4">
                <img src={p.imagem} alt={p.nome} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white">{p.nome}</h3>
                  <p className="text-blue-600 font-bold">R$ {parseFloat(p.preco).toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">Estoque: {p.estoque}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
