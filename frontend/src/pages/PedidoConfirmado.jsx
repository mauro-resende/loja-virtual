import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function PedidoConfirmado() {
  const navigate = useNavigate()
  const { limpar } = useCart()

  useEffect(() => {
    limpar()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-gray-900">
      <div className="max-w-md w-full text-center space-y-6">

        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <span className="text-5xl">✅</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Pedido Confirmado!</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Obrigado pela sua compra. Em breve entraremos em contato para confirmar a entrega.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-left space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛵</span>
            <div>
              <p className="font-bold text-gray-800 dark:text-white text-sm">Entrega em andamento</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Você receberá uma confirmação em breve</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <p className="font-bold text-gray-800 dark:text-white text-sm">Pagamento processado</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Via Mercado Pago com segurança</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📞</span>
            <div>
              <p className="font-bold text-gray-800 dark:text-white text-sm">Dúvidas?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Entre em contato pelo WhatsApp</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={() => navigate('/produtos')}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition">
            Continuar Comprando
          </button>
          <button onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold hover:border-gray-400 transition">
            Voltar ao Início
          </button>
        </div>

      </div>
    </div>
  )
}
