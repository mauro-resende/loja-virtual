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

// ── VÍDEOS REAIS — troca pelos seus links do YouTube ──────
const VIDEOS_REAIS = [
  {
    id: 'v1',
    titulo: 'Unboxing — Abrindo o produto',
    duracao: '1:23',
    emoji: '📦',
    url: 'https://www.youtube.com/embed/SEU_VIDEO_1',
  },
  {
    id: 'v2',
    titulo: 'Produto funcionando na prática',
    duracao: '0:58',
    emoji: '✅',
    url: 'https://www.youtube.com/embed/SEU_VIDEO_2',
  },
];

// ── AVALIAÇÕES — futuro, por enquanto vazio ───────────────
const AVALIACOES = [];

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { adicionar } = useCart();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [midiaAtiva, setMidiaAtiva] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('descricao');
  const [videoAberto, setVideoAberto] = useState(null);

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

        {/* GALERIA */}
        <div className="lg:w-3/5">
          <div className="w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
            {itemAtivo.tipo === 'video' ? (
              <iframe src={itemAtivo.src} title="Vídeo" className="w-full h-full" allowFullScreen />
            ) : (
              <img src={itemAtivo.src} alt={produto.nome}
                className="w-full h-full object-contain transition-all duration-300" />
            )}
          </div>
          <div className="flex flex-row gap-2 mt-3 overflow-x-auto pb-1">
            {MIDIA_PRODUTO.map((item, i) => (
              <button key={i} onClick={() => setMidiaAtiva(i)}
                className={`w-16 h-16 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all
                  ${midiaAtiva === i ? 'border-blue-500 shadow-md scale-105' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}>
                {item.tipo === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-xl">▶</div>
                ) : (
                  <img src={item.src} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white leading-tight">{produto.nome}</h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
            <span className="text-gray-400 text-xs">(24 avaliações)</span>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            {produto.preco_antigo && (
              <p className="text-sm text-gray-400 line-through">R$ {Number(produto.preco_antigo).toFixed(2)}</p>
            )}
            <p className="text-3xl font-bold text-blue-600">R$ {Number(produto.preco).toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">ou 3x de R$ {(produto.preco / 3).toFixed(2)} sem juros</p>
            <p className="text-sm text-green-600 font-semibold mt-1">10x de R$ {(produto.preco / 10).toFixed(2)} no cartão</p>
          </div>

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

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">Quantidade:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-700">−</button>
              <span className="px-4 py-2 font-semibold">{quantidade}</span>
              <button onClick={() => setQuantidade(q => q + 1)}
                className="px-3 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
            </div>
          </div>

          <button onClick={handleComprar}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-lg">
            Comprar Agora
          </button>
          <button onClick={handleAdicionar}
            className={`w-full py-3 border-2 font-bold rounded-xl transition-colors
              ${adicionado ? 'border-green-500 text-green-600 bg-green-50' : 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>
            {adicionado ? '✓ Adicionado ao carrinho!' : 'Adicionar ao Carrinho'}
          </button>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">🔒 Compra Segura</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">✅ Produto Original</span>
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">↩️ Troca em 7 dias</span>
          </div>
        </div>
      </div>

      {/* ABAS */}
      <div className="mt-10 border-t dark:border-gray-700 pt-8">

        {/* Botões das abas */}
        <div className="flex gap-2 mb-8 border-b dark:border-gray-700">
          {[
            { id: 'descricao', label: '📋 Descrição' },
            { id: 'videos',    label: '▶ Vídeos Reais' },
            { id: 'avaliacoes', label: '⭐ Avaliações' },
          ].map(aba => (
            <button key={aba.id} onClick={() => setAbaAtiva(aba.id)}
              className={`px-5 py-3 font-semibold text-sm transition-all border-b-2 -mb-px
                ${abaAtiva === aba.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
              {aba.label}
            </button>
          ))}
        </div>

        {/* ABA: DESCRIÇÃO */}
        {abaAtiva === 'descricao' && (
          <div>
            {produto.descricao ? (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {produto.descricao}
              </p>
            ) : (
              <p className="text-gray-400">Descrição não disponível.</p>
            )}
          </div>
        )}

        {/* ABA: VÍDEOS REAIS */}
        {abaAtiva === 'videos' && (
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Vídeos reais gravados por nós — sem edição, sem enganação.
            </p>

            {videoAberto && (
              <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setVideoAberto(null)}>
                <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden"
                  onClick={e => e.stopPropagation()}>
                  <iframe src={videoAberto} className="w-full h-full"
                    allow="autoplay" allowFullScreen title="Vídeo do produto" />
                </div>
                <button onClick={() => setVideoAberto(null)}
                  className="absolute top-4 right-4 text-white text-3xl font-bold">✕</button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VIDEOS_REAIS.map(video => (
                <div key={video.id} onClick={() => setVideoAberto(video.url)}
                  className="cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                    <span className="text-5xl">{video.emoji}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
                        <span className="text-white text-2xl ml-1">▶</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">{video.titulo}</p>
                    <p className="text-xs text-gray-400 mt-1">⏱ {video.duracao}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300">
              💡 Quer ver mais? Fala com a gente no WhatsApp — mandamos vídeo ao vivo do produto.
            </div>
          </div>
        )}

        {/* ABA: AVALIAÇÕES */}
        {abaAtiva === 'avaliacoes' && (
          <div>
            {AVALIACOES.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">⭐</p>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">Seja o primeiro a avaliar!</p>
                <p className="text-gray-400 text-sm mt-2">
                  Compre o produto e compartilhe sua experiência.
                </p>
                <button onClick={handleComprar}
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
                  Comprar e Avaliar
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {AVALIACOES.map((av, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow-400">{'⭐'.repeat(av.estrelas)}</span>
                      <span className="font-semibold text-gray-800 dark:text-white text-sm">{av.nome}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{av.comentario}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
