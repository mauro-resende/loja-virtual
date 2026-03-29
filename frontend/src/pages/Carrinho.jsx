import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Carrinho() {
  const { itens, remover, total } = useCart()

  if (itens.length === 0) {
    return (
      <div className='max-w-2xl mx-auto py-20 px-6 text-center'>
        <div className='text-6xl mb-6'>🛒</div>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-4'>Carrinho vazio</h1>
        <p className='text-gray-500 dark:text-gray-400 mb-8'>Adicione produtos para continuar</p>
        <Link to='/produtos' className='bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition'>Ver Produtos</Link>
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto py-12 px-6'>
      <h1 className='text-4xl font-bold mb-10 text-gray-800 dark:text-white'>Meu Carrinho</h1>
      <div className='space-y-4 mb-8'>
        {itens.map(item => (
          <div key={item.id} className='flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow'>
            <img src={item.imagem} alt={item.nome} className='w-20 h-20 object-cover rounded-lg' />
            <div className='flex-1'>
              <h2 className='font-bold text-gray-800 dark:text-white'>{item.nome}</h2>
              <p className='text-blue-600 font-bold'>R$ {parseFloat(item.preco).toFixed(2)}</p>
              <p className='text-gray-500 text-sm'>Quantidade: {item.quantidade}</p>
            </div>
            <button onClick={() => remover(item.id)} className='text-red-500 hover:text-red-700 font-bold text-xl'>✕</button>
          </div>
        ))}
      </div>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow'>
        <div className='flex justify-between items-center mb-6'>
          <span className='text-xl font-bold text-gray-800 dark:text-white'>Total:</span>
          <span className='text-2xl font-bold text-blue-600'>R$ {total().toFixed(2)}</span>
        </div>
        <Link to='/checkout' className='block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-bold'>Finalizar Compra</Link>
      </div>
    </div>
  )
}
