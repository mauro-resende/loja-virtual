import PedidoConfirmado from './pages/PedidoConfirmado'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import Carrinho from './pages/Carrinho'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import Sobre from './pages/Sobre'
import FAQ from './pages/FAQ'
import Politica from './pages/Politica'
import { Link } from 'react-router-dom'

const WHATSAPP = '5527999454882'

function BotaoWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=Olá! Vim pelo site e tenho uma dúvida.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-[9999] flex items-center justify-center bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-xl transition-all hover:scale-105"

    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}


function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Marca */}
          <div>
            <h2 className="text-white text-xl font-bold mb-3">SupriMais</h2>
            <p className="text-sm leading-relaxed">
              Produtos essenciais com entrega rápida em Serra - ES. Compra segura e atendimento real.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-green-400 hover:text-green-300 text-sm font-semibold"
            >
              💬 (27) 99945-4882
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Links úteis</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/produtos" className="hover:text-white transition-colors">Produtos</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre nós</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
              <li><Link to="/politica" className="hover:text-white transition-colors">Política de Troca</Link></li>
            </ul>
          </div>

          {/* Pagamentos */}
          <div>
            <h3 className="text-white font-semibold mb-3">Pagamento seguro</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-blue-400">VISA</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-red-400">Master</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-yellow-400">ELO</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-green-400">PIX</span>
              <span className="bg-gray-800 text-xs px-2 py-1 rounded font-bold text-gray-300">Boleto</span>
            </div>
            <p className="text-xs">🔒 Ambiente 100% seguro via Mercado Pago</p>
            <p className="text-xs mt-1">↩️ Troca em até 7 dias</p>
            <p className="text-xs mt-1">🚀 Entrega no mesmo dia</p>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} SupriMais — Todos os direitos reservados. Serra - ES
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <div className='min-h-screen bg-white dark:bg-gray-900 flex flex-col'>
            <Navbar />
            <main className='flex-1'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/produtos' element={<Produtos />} />
                <Route path='/produtos/:id' element={<ProdutoDetalhe />} />
                <Route path='/carrinho' element={<Carrinho />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/pedido-confirmado' element={<PedidoConfirmado />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/sobre' element={<Sobre />} />
                <Route path='/faq' element={<FAQ />} />
                <Route path='/politica' element={<Politica />} />
              </Routes>
            </main>
            <Footer />
            <BotaoWhatsApp />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
