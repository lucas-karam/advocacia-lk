import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já deu o consentimento
    const consent = localStorage.getItem('lgpd_consent_v2');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'granted') {
      // Se já havia aceitado em sessões anteriores, dispara os gatilhos silenciosamente na inicialização
      triggerConsentAPIs();
    }
  }, []);

  const triggerConsentAPIs = () => {
    // 1. Libera o Google Ads e Analytics (Consent Mode v2 UPDATE)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }

    // 2. Libera o Meta Pixel (Consent API)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('consent', 'grant');
    }

    // 3. Libera as Tags do Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'cookie_consent_update' });
    }
  };

  const handleReject = () => {
    localStorage.setItem('lgpd_consent_v2', 'denied');
    setIsVisible(false);
  };

  const handleAccept = () => {
    localStorage.setItem('lgpd_consent_v2', 'granted');
    setIsVisible(false);
    triggerConsentAPIs();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900 border-t border-slate-800 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0 mt-1 md:mt-0" />
          <div className="text-sm text-slate-300">
            <p className="font-semibold text-slate-100 mb-1">Privacidade e Uso de Cookies (LGPD)</p>
            <p>
              Utilizamos cookies e tecnologias (como o Meta Pixel e Google Analytics) para melhorar sua experiência, personalizar anúncios e analisar nosso tráfego. Ao clicar em "Aceitar", você concorda com o monitoramento avançado e nossa política de privacidade.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button 
            onClick={handleReject}
            aria-label="Recusar cookies de rastreamento" className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Recusar
          </button>
          <button 
            onClick={handleAccept}
            aria-label="Aceitar todos os cookies" className="flex-1 md:flex-none px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
          >
            Aceitar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}
