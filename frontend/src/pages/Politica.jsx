export default function Politica() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Política de Troca e Devolução
      </h1>
      <div className="w-16 h-1 bg-blue-600 rounded mb-8" />

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Prazo para troca ou devolução</h2>
          <p>Você tem até <strong>7 dias corridos</strong> após o recebimento do produto para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor (Art. 49).</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Como solicitar</h2>
          <p>Entre em contato pelo WhatsApp <strong>(27) 99945-4882</strong> informando:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Número do pedido</li>
            <li>Motivo da troca ou devolução</li>
            <li>Foto do produto (se houver defeito)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Condições aceitas</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Produto com defeito de fabricação</li>
            <li>Produto diferente do anunciado</li>
            <li>Produto danificado na entrega</li>
            <li>Desistência da compra (produto sem uso e na embalagem original)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Reembolso</h2>
          <p>Após recebermos e analisarmos o produto, o reembolso é processado em até <strong>5 dias úteis</strong> pelo mesmo meio de pagamento utilizado na compra.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Frete de devolução</h2>
          <p>Quando o motivo for <strong>defeito ou erro nosso</strong>, o frete de devolução é por nossa conta. Em caso de desistência, o frete é responsabilidade do cliente.</p>
        </section>

      </div>

      <div className="mt-10 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
        <p className="text-gray-700 dark:text-gray-300 mb-3">Dúvidas? Fale com a gente.</p>
        <a
          href="https://wa.me/5527999454882"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Falar no WhatsApp
        </a>
      </div>

    </div>
  );
}
