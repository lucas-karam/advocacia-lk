import { Shield, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
      {/* Top Emergency Notice Bar */}
      <div className={`bg-slate-900 text-slate-300 px-4 text-center text-xs sm:text-sm font-medium relative flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-2.5 opacity-100'}`}>
        <Shield className="w-4 h-4 text-blue-400 shrink-0" />
        <span>
          Atendimento de emergência: Vítima de vazamento?{' '}
          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              window.dataLayer = window.dataLayer || []; 
              window.dataLayer.push({event: 'cta_click', button_location: 'header_emergency'}); 
              window.dispatchEvent(new Event('open-whatsapp-widget')); 
            }} 
            className="text-white font-bold underline ml-1 hover:text-blue-300 cursor-pointer"
          >
            Fale em sigilo agora
          </button>
        </span>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3.5' : 'bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#top" aria-label="Página inicial - Lucas Karam Advocacia" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-2 group cursor-pointer">
            <Shield className="w-7 h-7 text-blue-600 transition-colors" />
            <span className="font-serif font-bold text-xl tracking-tight text-slate-900">
              Lucas Karam<span className="text-blue-600">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#sobre" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Sobre</a>
            <a href="#midia" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Na Mídia</a>
            <button 
              onClick={(e) => { e.preventDefault(); window.dataLayer = window.dataLayer || []; window.dataLayer.push({event: 'cta_click', button_location: 'header_nav'}); window.dispatchEvent(new Event('open-whatsapp-widget')); }}
              className="relative group bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">Fale Conosco</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            aria-label="Abrir menu de navegação"
            className="md:hidden text-slate-900 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-6 flex flex-col gap-4 animate-fade-in">
            <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2 border-b border-slate-50">Serviços</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2 border-b border-slate-50">Sobre</a>
            <a href="#midia" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2 border-b border-slate-50">Na Mídia</a>
            <button 
              onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); window.dataLayer = window.dataLayer || []; window.dataLayer.push({event: 'cta_click', button_location: 'header_mobile_cta'}); window.dispatchEvent(new Event('open-whatsapp-widget')); }} 
              className="bg-blue-600 text-white text-center font-semibold px-5 py-3 rounded-lg mt-2 cursor-pointer"
            >
              Falar com Advogado (Sigilo)
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
