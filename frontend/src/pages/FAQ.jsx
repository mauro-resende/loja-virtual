import { useState } from 'react';

const PERGUNTAS = [
  {
    q: 'Vocês entregam na minha região?',
    a: 'Atendemos Serra - ES e regiões próximas via motoboy no mesmo dia. Para outras cidades, enviamos pelos Correios (PAC).',
  },
  {
    q: 'Qual o prazo de entrega?',
    a: 'Motoboy: mesmo dia para pedidos feitos até as 17h. Correios PAC: 5 a 10 dias úteis.',
  },
  {
    q: 'Como faço para rastrear meu pedido?',
    a: 'Após o envio, você recebe o código de rastreamento pelo WhatsApp.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos cartão de crédito (Visa, Master, Elo), PIX e boleto bancário — tudo via Mercado Pago com total segurança.',
  },
  {
    q: 'Posso retirar o produto pessoalmente?',
    a: 'Sim! Temos ponto de retirada em Serra - ES sem custo de frete. Entre em contato pelo WhatsApp para combinar.',
  },
  {
    q: 'O produto tem garantia?',
    a: 'Sim. Todos os produtos seguem o Código de Defesa do Consumidor com garantia mínima de 90 dias.',
  },
  {
    q: 'E se eu quiser trocar ou devolver?',
    a: 'Aceitamos trocas e devoluções em até 7 dias após o recebimento, conforme a política de trocas da loja.',
  },
];

function Item({ q, a }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex justify-between items-center py-4 text-left text-gray-800 dark:text-white font-medium hover:text-blue-600 transition-colors"
      >
        {q}
        <span className="text-xl ml-4">{aberto ? '−' : '+'}</span>
      </button>
      {aberto && (
        <p className="pb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Perguntas Frequentes
      </h1>
      <div className="w-16 h-1 bg-blue-600 rounded mb-8" />
      <div>
        {PERGUNTAS.map((item, i) => (
          <Item key={i} q={item.q} a={item.a} />
        ))}
      </div>
      <div className="mt-10 bg-blue-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
        <p className="text-gray-700 dark:text-gray-300 mb-3">Não encontrou sua resposta?</p>
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
