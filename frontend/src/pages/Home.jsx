export default function Home() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      <section className='bg-blue-600 text-white py-20 px-6 text-center'>
        <h1 className='text-5xl font-bold mb-4'>Tudo que voce precisa</h1>
        <p className='text-xl mb-8'>Produtos essenciais com o melhor preco e entrega rapida</p>
        <a href='/produtos' className='bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition'>Ver Produtos</a>
      </section>
      <section className='max-w-6xl mx-auto py-16 px-6'>
        <h2 className='text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white'>Por que escolher a SupriMais?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl'>
            <div className='text-4xl mb-4'>🚚</div>
            <h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-white'>Entrega Rapida</h3>
            <p className='text-gray-600 dark:text-gray-400'>Receba em casa com agilidade e seguranca</p>
          </div>
          <div className='text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl'>
            <div className='text-4xl mb-4'>💳</div>
            <h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-white'>Pagamento Facil</h3>
            <p className='text-gray-600 dark:text-gray-400'>Pix, cartao de credito e muito mais</p>
          </div>
          <div className='text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl'>
            <div className='text-4xl mb-4'>✅</div>
            <h3 className='text-xl font-bold mb-2 text-gray-800 dark:text-white'>Qualidade Garantida</h3>
            <p className='text-gray-600 dark:text-gray-400'>Produtos selecionados com cuidado para voce</p>
          </div>
        </div>
      </section>
    </div>
  )
}
