import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Lock as LockIcon } from 'lucide-react';

const mediaImages = [
  {
    src: "https://lucaskaram.com.br/wp-content/uploads/2023/05/TV-GLOBO-LUCAS-KARAM-23-1024x580.png",
    alt: "Entrevista TV Globo - Vazamento de Fotos Íntimas"
  },
  {
    src: "/cnj-lucas-karam.jpg",
    alt: "Professor e Especialista em Direito Digital - CNJ"
  },
  {
    src: "https://lucaskaram.com.br/wp-content/uploads/2021/08/Captura-de-tela-2023-12-20-214058.png",
    alt: "Entrevista Bom Dia Brasil - Lucas Karam"
  },
  {
    src: "https://lucaskaram.com.br/wp-content/uploads/2023/05/TV-GLOBO-LUCAS-KARAM-1024x576.png",
    alt: "Entrevista TV Globo - Crimes Cibernéticos e Vazamento de Nudes"
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dynamicTitle, setDynamicTitle] = useState(<>Vítima de vazamento íntimo ou <span className="text-blue-600">Deepfake (IA)</span>? Você não está só.</>);
  const [dynamicDesc, setDynamicDesc] = useState("Aja rápido. Nossa equipe jurídica atua na remoção urgente de arquivos íntimos reais ou falsos (gerados por Inteligência Artificial), identificação de criminosos e combate à sextorsão.");

  useEffect(() => {
    // Dynamic Text Replacement (DTR)
    const urlParams = new URLSearchParams(window.location.search);
    const utmTerm = (urlParams.get('utm_term') || '').toLowerCase();
    const utmCampaign = (urlParams.get('utm_campaign') || '').toLowerCase();

    if (utmTerm.includes('crimes') || utmCampaign.includes('crimes')) {
      setDynamicTitle(<>Especialista em <span className="text-blue-600">Crimes Cibernéticos</span> e Proteção Digital.</>);
      setDynamicDesc("Sofreu um crime virtual? Atuamos com inteligência cibernética para identificar perfis falsos, remover conteúdos ilegais e responsabilizar os criminosos.");
    } else if (utmTerm.includes('nudes') || utmTerm.includes('vazamento') || utmCampaign.includes('vazamento')) {
      setDynamicTitle(<>Vítima de <span className="text-blue-600">Vazamento de Nudes</span>? Nós removemos tudo.</>);
      setDynamicDesc("Aja rápido. Removemos fotos e vídeos íntimos vazados na internet, identificamos quem vazou via IP e exigimos indenização financeira.");
    } else if (utmTerm.includes('sextorsao') || utmTerm.includes('chantagem')) {
      setDynamicTitle(<>Sofrendo <span className="text-blue-600">Sextorsão</span> ou Chantagem Online?</>);
      setDynamicDesc("Não ceda, não apague as provas e não mande dinheiro. Nossa equipe atua bloqueando a exposição e acionando as autoridades de forma totalmente sigilosa.");
    }

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % mediaImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white text-slate-900 pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl -translate-x-1/3 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl flex-shrink-0">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in-up"
            >
              <LockIcon className="w-4 h-4" />
              Atendimento 100% Sigiloso e Discreto
            </div>
            
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-in-up animate-delay-100"
            >
              {dynamicTitle}
            </h1>
            
            <p 
              className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed animate-fade-in-up animate-delay-200"
            >
              {dynamicDesc}
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300"
            >
              <button aria-label="Falar com Especialista via WhatsApp" 
                onClick={(e) => { e.preventDefault(); window.dataLayer = window.dataLayer || []; window.dataLayer.push({event: 'cta_click', button_location: 'hero_primary'}); window.dispatchEvent(new Event('open-whatsapp-widget')); }}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
              >
                Falar com Especialista Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <a href="#servicos" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-lg font-medium transition-colors border border-slate-200 shadow-sm">
                Como funciona a defesa?
              </a>
            </div>
            
            <div 
              className="mt-10 flex flex-wrap gap-4 text-sm text-slate-600 animate-fade-in-up animate-delay-400"
            >
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Remoção Liminar (Urgente)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Identificação do Criminoso (IP)</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in-up animate-delay-300">
            <div className="relative w-full max-w-lg aspect-video lg:aspect-[4/3]">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur-xl opacity-20 animate-pulse-soft"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500 w-full h-full bg-slate-100">
                
                {mediaImages.map((image, index) => (
                  <img 
                    key={index} decoding="async" draggable="false"
                    src={image.src}
                    alt={image.alt}
                    onError={(e) => {
                      // Fallback resiliente caso imagens externas falhem
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/cnj-lucas-karam.jpg')) {
                        target.src = '/cnj-lucas-karam.jpg';
                      }
                    }}
                    loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} width="1920" height="1080"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                {/* Media Badge (Top Left) */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full text-white shadow-lg border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                    <span className="text-xs font-bold tracking-wide">ESPECIALISTA NA MÍDIA</span>
                  </div>
                </div>

                {/* Progress indicators (Top Right) */}
                <div className="absolute top-6 right-5 z-10 flex gap-1.5 drop-shadow-md">
                  {mediaImages.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${currentImageIndex === idx ? 'w-6 bg-blue-500' : 'w-2 bg-white/70'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
