import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <div className='min-h-screen bg-white dark:bg-gray-900'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/produtos' element={<Produtos />} />
              <Route path='/carrinho' element={<Carrinho />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
