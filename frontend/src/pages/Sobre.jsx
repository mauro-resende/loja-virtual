export default function Sobre() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Sobre a SupriMais
      </h1>
      <div className="w-16 h-1 bg-blue-600 rounded mb-8" />

      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
        A <strong>SupriMais</strong> nasceu com um propósito simples: levar o que você precisa,
        quando você precisa, sem complicação.
      </p>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
        Somos uma loja regional com sede em <strong>Serra - ES</strong>, focada em produtos de
        necessidade com entrega rápida na sua região. Sabemos que às vezes a necessidade é
        urgente — por isso trabalhamos com entrega no mesmo dia via motoboy.
      </p>

      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
        Aqui você não enfrenta fila, não espera dias e não fica sem resposta.
        Compra simples, entrega rápida, produto garantido.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">🚀</div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">Entrega Rápida</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Motoboy no mesmo dia em Serra - ES</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">Produto Garantido</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Qualidade verificada antes de enviar</p>
        </div>
        <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">💬</div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">Atendimento Real</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fala direto com a gente no WhatsApp</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <h2 className="font-bold text-gray-800 dark:text-white mb-3">Fale conosco</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">📍 Serra - ES</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          💬 WhatsApp: <a href="https://wa.me/5527999454882" className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">(27) 99945-4882</a>
        </p>
      </div>

    </div>
  );
}
