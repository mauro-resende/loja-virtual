import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const API = 'https://loja-virtual-production-6241.up.railway.app';

// ── MÍDIA DO PRODUTO ─────────────────────────────────────────
// Substitua pelas imagens e vídeo reais do seu produto
const MIDIA_PRODUTO = [
  { tipo: 'imagem', src: 'https://via.placeholder.com/600x600?text=Foto+1' },
  { tipo: 'imagem', src: 'https://via.placeholder.com/600x600?text=Foto+2' },
  { tipo: 'imagem', src: 'https://via.placeholder.com/600x600?text=Foto+3' },
  {
    tipo: 'video',
    src: 'https://www.youtube.com/embed/SEU_VIDEO_ID',   // ← cole o ID do YouTube
    thumb: 'https://via.placeholder.com/100x100?text=▶',
  },
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
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <span className="cursor-pointer hover:text-blue-500" onClick={() => navigate('/')}>Início</span>
        <span className="mx-2">/</span>
        <span className="cursor-pointer hover:text-blue-500" onClick={() => navigate('/produtos')}>Produtos</span>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-200">{produto.nome}</span>
      </nav>

      {/* ÁREA PRINCIPAL */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* ── GALERIA ── */}
        <div className="flex gap-3 flex-1">

          {/* Miniaturas verticais */}
          <div className="flex flex-col gap-2">
            {MIDIA_PRODUTO.map((item, i) => (
              <button
                key={i}
                onClick={() => setMidiaAtiva(i)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all
                  ${midiaAtiva === i
                    ? 'border-blue-500 shadow-md scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
              >
                {item.tipo === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-xl">
                    ▶
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mídia principal */}
          <div className="flex-1 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square max-h-[500px]">
            {itemAtivo.tipo === 'video' ? (
              <iframe
                src={itemAtivo.src}
                title="Vídeo do produto"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
        </div>

        {/* ── INFORMAÇÕES ── */}
        <div className="md:w-80 flex flex-col gap-4">

          {/* Nome e preço */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight">
              {produto.nome}
            </h1>
            {produto.preco_antigo && (
              <p className="text-sm text-gray-400 line-through mt-1">
                R$ {Number(produto.preco_antigo).toFixed(2)}
              </p>
            )}
            <p className="text-3xl font-bold text-blue-600 mt-1">
              R$ {Number(produto.preco).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              ou 3x de R$ {(produto.preco / 3).toFixed(2)} sem juros
            </p>
          </div>

          {/* Quantidade */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">Quantidade:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >−</button>
              <span className="px-4 py-1 font-semibold">{quantidade}</span>
              <button
                onClick={() => setQuantidade(q => q + 1)}
                className="px-3 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >+</button>
            </div>
          </div>

          {/* Botões */}
          <button
            onClick={handleComprar}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            Comprar Agora
          </button>
          <button
            onClick={handleAdicionar}
            className={`w-full py-3 border-2 font-bold rounded-xl transition-colors
              ${adicionado
                ? 'border-green-500 text-green-600 bg-green-50'
                : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
          >
            {adicionado ? '✓ Adicionado ao carrinho!' : 'Adicionar ao Carrinho'}
          </button>

          {/* Entrega */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm space-y-2">
            <p className="font-semibold text-gray-700 dark:text-gray-200">Entrega em Serra - ES</p>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>🛵</span><span>Motoboy — Hoje mesmo</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>📦</span><span>Ponto de Retirada — Grátis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>🚚</span><span>Correios PAC — R$ 15,00</span>
            </div>
          </div>

          {/* Selos */}
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">🔒 Compra Segura</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">✅ Produto Original</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">↩️ Troca Fácil</span>
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
