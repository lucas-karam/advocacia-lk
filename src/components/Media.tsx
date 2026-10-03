import { useState, useEffect } from 'react';
import { Play, ChevronDown, ChevronUp, X, MessageCircle } from 'lucide-react';

const mediaItems = [
  {
    image: "/cnj-lucas-karam.jpg",
    channel: "CNJ",
    title: "Professor e Advogado Especialista em Direito Digital"
  },
  {
    image: "/entrevista-1.jpg",
    channel: "Entrevista",
    title: "Vazamento de Imagens e Proteção da Vítima"
  },
  {
    image: "/entrevista-2.jpg",
    channel: "Análise na TV",
    title: "Como agir em casos de Deepfakes e Nudez"
  },
  {
    image: "/entrevista-3.jpg",
    channel: "Na Mídia",
    title: "Direito Digital e Crimes Cibernéticos em Foco"
  },
  {
    image: "/entrevista-4.jpg",
    channel: "Atuação na Mídia",
    title: "Defesa Estratégica em Crimes Digitais"
  },
  {
    image: "/entrevista-7.jpg",
    channel: "Reportagem Especial",
    title: "Especialista orienta vítimas de Sextorsão"
  },
  {
    image: "/entrevista-5.jpg",
    channel: "Comentário Jurídico",
    title: "Aumento de crimes virtuais no Brasil"
  },
  {
    image: "/entrevista-6.jpg",
    channel: "Entrevista Especializada",
    title: "Como rastrear criminosos na internet"
  },
  {
    image: "/entrevista-8.jpg",
    channel: "Cobertura Nacional",
    title: "Indenização por Danos Morais em vazamentos"
  },
  {
    image: "/entrevista-9.jpg",
    channel: "Segurança Digital",
    title: "O Papel do Advogado no Combate a Deepfakes"
  },
  {
    image: "/entrevista-10.jpg",
    channel: "Análise Especializada",
    title: "Crimes Contra a Honra no Ambiente Online"
  },
  {
    image: "/entrevista-11.jpg",
    channel: "Entrevista",
    title: "Cibersegurança e Proteção de Dados Pessoais"
  },
  {
    image: "/entrevista-12.jpg",
    channel: "Na Mídia",
    title: "Atuação Rápida com Remoção de Conteúdo (Liminar)"
  },
  {
    image: "/entrevista-13.jpg",
    channel: "Direito Digital",
    title: "O perigo do Revenge Porn e a Legislação Atual"
  },
  {
    image: "/entrevista-14.jpg",
    channel: "Análise na Mídia",
    title: "Proteção da Imagem no Ambiente Digital"
  },
  {
    image: "/entrevista-15.jpg",
    channel: "Opinião Jurídica",
    title: "Responsabilidade das plataformas de redes sociais"
  }
];

export default function Media() {
  const [showAll, setShowAll] = useState(false);
  const [activeMedia, setActiveMedia] = useState<{ image: string; channel: string; title: string } | null>(null);
  const displayedItems = showAll ? mediaItems : mediaItems.slice(0, 6);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMedia(null);
      }
    };
    if (activeMedia) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMedia]);

  return (
    <section id="midia" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            Na Mídia
          </h2>
          <p className="text-lg text-slate-600">
            Reconhecido como referência nacional em Direito Digital e Crimes Cibernéticos, com participações nos principais veículos de comunicação do país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item, index) => (
            <div 
              key={index}
              onClick={() => setActiveMedia(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveMedia(item); } }}
              aria-label={`Ver detalhes de ${item.title} - ${item.channel}`}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 bg-slate-50 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-200">
                <img loading="lazy" decoding="async" fetchPriority="low" 
                  src={item.image} 
                  width="1280" height="720"
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
                  <div className="w-14 h-14 bg-blue-600/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {item.channel}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {mediaItems.length > 6 && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-medium transition-colors"
            >
              {showAll ? (
                <>Ver menos <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Ver mais participações <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Media Spotlight Lightbox Modal */}
      {activeMedia && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={activeMedia.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveMedia(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                  {activeMedia.channel}
                </span>
                <span className="text-slate-300 text-sm font-medium line-clamp-1">
                  {activeMedia.title}
                </span>
              </div>
              <button 
                onClick={() => setActiveMedia(null)}
                aria-label="Fechar vídeo"
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <video 
                controls 
                autoPlay 
                playsInline
                className="w-full h-full object-contain"
                poster={activeMedia.image}
              >
                <source src="/entrevista-16.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução direta deste vídeo.
              </video>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{activeMedia.title}</p>
                <p className="text-xs text-slate-400">Dr. Lucas Karam orienta sobre crimes digitais e proteção da privacidade.</p>
              </div>
              <button 
                onClick={() => {
                  setActiveMedia(null);
                  window.dispatchEvent(new Event('open-whatsapp-widget'));
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md shrink-0 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
