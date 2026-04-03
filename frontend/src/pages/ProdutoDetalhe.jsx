import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const API = 'https://loja-virtual-production-6241.up.railway.app';

const MIDIA_PRODUTO = [
  { tipo: 'imagem', src: 'https://i.ibb.co/3mzYrRTy/Chapa-1.png' },
  { tipo: 'imagem', src: 'https://i.ibb.co/HTg8sPHq/Chapa-2.png' },
  { tipo: 'imagem', src: 'https://i.ibb.co/0R48PBKg/Chapa-3.jpg' },
  { tipo: 'imagem', src: 'https://i.ibb.co/HLcx0ygQ/Chapa-4.jpg' },
  { tipo: 'imagem', src: 'https://i.ibb.co/x83Mdz58/Chapa-5.png' },
];

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionar } = useCart();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [midiaAtiva, setMidiaAtiva] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/produtos/${id}`)
      .then(r => r.json())
      .then(data => { setProduto(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  function handleAdicionar() {
    adicionar({ ...produto, quantidade });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  }

  function handleComprar() {
    adicionar({ ...produto, quantidade });
    navigate('/checkout');
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!produto) return (
    <div className="text-center py-20 text-gray-500">Produto não encontrado.</div>
  );

  const itemAtivo = MIDIA_PRODUTO[midiaAtiva];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-4 flex flex-wrap gap-1">
        <span className="cursor-pointer hover:text-blue-500" onClick={() => navigate('/')}>Início</span>
        <span>/</span>
        <span className="cursor-pointer hover:text-blue-500" onClick={() => navigate('/produtos')}>Produtos</span>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300 line-clamp-1">{produto.nome}</span>
      </nav>

      {/* LAYOUT PRINCIPAL */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── GALERIA ── */}
        <div className="lg:w-3/5">

          {/* Imagem principal */}
          <div className="w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
            {itemAtivo.tipo === 'video' ? (
              <iframe
                src={itemAtivo.src}
                title="Vídeo do produto"
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <img
                src={itemAtivo.src}
                alt={produto.nome}
                className="w-full h-full object-contain transition-all duration-300"
              />
            )}
          </div>

          {/* Miniaturas horizontais (mobile) / verticais já no desktop fica ao lado */}
          <div className="flex flex-row gap-2 mt-3 overflow-x-auto pb-1">
            {MIDIA_PRODUTO.map((item, i) => (
              <button
                key={i}
                onClick={() => setMidiaAtiva(i)}
                className={`w-16 h-16 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all
                  ${midiaAtiva === i
                    ? 'border-blue-500 shadow-md scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
              >
                {item.tipo === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-xl">▶</div>
                ) : (
                  <img src={item.src} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── INFORMAÇÕES ── */}
        <div className="lg:w-2/5 flex flex-col gap-4">

          {/* Nome */}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white leading-tight">
            {produto.nome}
          </h1>

          {/* Avaliação */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-400 text-xs">(24 avaliações)</span>
          </div>

          {/* Preço */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            {produto.preco_antigo && (
              <p className="text-sm text-gray-400 line-through">
                R$ {Number(produto.preco_antigo).toFixed(2)}
              </p>
            )}
            <p className="text-3xl font-bold text-blue-600">
              R$ {Number(produto.preco).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ou 3x de R$ {(produto.preco / 3).toFixed(2)} sem juros
            </p>
            <p className="text-sm text-green-600 font-semibold mt-1">
              10x de R$ {(produto.preco / 10).toFixed(2)} no cartão
            </p>
          </div>

          {/* Entrega */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm space-y-2">
            <p className="font-semibold text-gray-700 dark:text-gray-200">Entrega em Serra - ES</p>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>🛵</span><span>Motoboy — <strong>Hoje mesmo</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>📦</span><span>Retirada no local — <strong>Grátis</strong></span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>🚚</span><span>Correios PAC — R$ 15,00</span>
            </div>
          </div>

          {/* Quantidade */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">Quantidade:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >−</button>
              <span className="px-4 py-2 font-semibold">{quantidade}</span>
              <button
                onClick={() => setQuantidade(q => q + 1)}
                className="px-3 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >+</button>
            </div>
          </div>

          {/* Botões */}
          <button
            onClick={handleComprar}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-lg"
          >
            Comprar Agora
          </button>
          <button
            onClick={handleAdicionar}
            className={`w-full py-3 border-2 font-bold rounded-xl transition-colors
              ${adicionado
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
          >
            {adicionado ? '✓ Adicionado ao carrinho!' : 'Adicionar ao Carrinho'}
          </button>

          {/* Selos */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">🔒 Compra Segura</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">✅ Produto Original</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">↩️ Troca em 7 dias</span>
          </div>
        </div>
      </div>

      {/* Descrição */}
      {produto.descricao && (
        <div className="mt-10 border-t dark:border-gray-700 pt-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Descrição do Produto</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {produto.descricao}
          </p>
        </div>
      )}

    </div>
  );
}
