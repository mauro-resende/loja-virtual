import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { dark, setDark } = useTheme()
  const { itens } = useCart()
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <nav className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between'>
      <Link to='/' className='text-2xl font-bold text-blue-600 dark:text-blue-400'>SupriMais</Link>
      <div className='flex items-center gap-6'>
        <Link to='/' className='text-gray-700 dark:text-gray-200 hover:text-blue-600'>Inicio</Link>
        <Link to='/produtos' className='text-gray-700 dark:text-gray-200 hover:text-blue-600'>Produtos</Link>
        <Link to='/carrinho' className='relative text-gray-700 dark:text-gray-200 hover:text-blue-600'>
          Carrinho
          {totalItens > 0 && (
            <span className='absolute -top-2 -right-4 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>{totalItens}</span>
          )}
        </Link>
        <button onClick={() => setDark(!dark)} className='bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm'>
          {dark ? 'Claro' : 'Escuro'}
        </button>
      </div>
    </nav>
  )
}
