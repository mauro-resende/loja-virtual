import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { dark, setDark } = useTheme()
  const { itens } = useCart()
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0)
  const [menuAberto, setMenuAberto] = useState(false)

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <nav className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4'>
      <div className='flex items-center justify-between'>

        {/* Logo */}
        <Link to='/' className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
          SupriMais
        </Link>

        {/* Desktop — links normais */}
        <div className='hidden md:flex items-center gap-6'>
          <Link to='/' className='text-gray-700 dark:text-gray-200 hover:text-blue-600'>Inicio</Link>
          <Link to='/produtos' className='text-gray-700 dark:text-gray-200 hover:text-blue-600'>Produtos</Link>
          <Link to='/sobre' className='text-gray-700 dark:text-gray-200 hover:text-blue-600'>Sobre</Link>
          <Link to='/faq' className='text-gray-700 dark:text-gray-200 hover:text-blue-600'>FAQ</Link>
          <Link to='/carrinho' className='relative text-gray-700 dark:text-gray-200 hover:text-blue-600'>
            Carrinho
            {totalItens > 0 && (
              <span className='absolute -top-2 -right-4 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {totalItens}
              </span>
            )}
          </Link>
          <button
            onClick={() => setDark(!dark)}
            className='bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm'
          >
            {dark ? 'Claro' : 'Escuro'}
          </button>
        </div>

        {/* Mobile — ícones direita */}
        <div className='flex md:hidden items-center gap-4'>

          {/* Carrinho */}
          <Link to='/carrinho' className='relative text-gray-700 dark:text-gray-200'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItens > 0 && (
              <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {totalItens}
              </span>
            )}
          </Link>

          {/* Hamburguer */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className='text-gray-700 dark:text-gray-200'
          >
            {menuAberto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile aberto */}
      {menuAberto && (
        <div className='md:hidden mt-4 flex flex-col gap-4 border-t border-gray-200 dark:border-gray-700 pt-4'>
          <Link to='/' onClick={fecharMenu} className='text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium'>Inicio</Link>
          <Link to='/produtos' onClick={fecharMenu} className='text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium'>Produtos</Link>
          <Link to='/sobre' onClick={fecharMenu} className='text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium'>Sobre</Link>
          <Link to='/faq' onClick={fecharMenu} className='text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium'>FAQ</Link>
          <Link to='/politica' onClick={fecharMenu} className='text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium'>Política de Troca</Link>
          <div className='flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700'>
            <span className='text-sm text-gray-500'>Tema</span>
            <button
              onClick={() => setDark(!dark)}
              className='bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm'
            >
              {dark ? 'Claro' : 'Escuro'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
