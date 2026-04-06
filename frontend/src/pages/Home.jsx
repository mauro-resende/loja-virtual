import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* HERO — produto em destaque */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">

          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Oferta especial
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
              Chapa Profissional<br />Metallux 90x30
            </h1>
            <p className="text-blue-100 mt-4 text-lg">
              Ideal para hambúrguer, bife, frango e muito mais.<br />
              Entrega no mesmo dia em Serra - ES.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <div>
                <p className="text-blue-200 text-sm line-through">R$ 1.199,90</p>
                <p className="text-4xl font-bold">R$ 949,90</p>
                <p className="text-blue-200 text-sm">ou 3x de R$ 316,63 sem juros</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={() => navigate('/produtos/4')}
                className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition"
              >
                Comprar Agora
              </button>
              <button
                onClick={() => navigate('/produtos')}
                className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-blue-600 transition"
              >
                Ver Produtos
              </button>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://i.ibb.co/3mzYrRTy/Chapa-1.png"
              alt="Chapeira Metallux"
              className="w-full max-w-sm drop-shadow-2xl rounded-2xl bg-white/10 p-4"
            />
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Por que escolher a SupriMais?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="text-4xl mb-3">🛵</div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Entrega Rápida</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Motoboy no mesmo dia em Serra - ES. Pediu, recebeu.</p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="text-4xl mb-3">💳</div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Pagamento Fácil</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Pix, cartão de crédito em até 10x e boleto bancário.</p>
          </div>
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Qualidade Garantida</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Produtos originais com garantia e troca em 7 dias.</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CONFIANÇA */}
      <section className="bg-blue-50 dark:bg-gray-800 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
            Compra 100% segura
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-medium">Dados protegidos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="text-2xl">💰</span>
              <span className="text-sm font-medium">Mercado Pago</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="text-2xl">↩️</span>
              <span className="text-sm font-medium">Troca em 7 dias</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span className="text-2xl">📦</span>
              <span className="text-sm font-medium">Produto original</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
