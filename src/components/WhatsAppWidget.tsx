import { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, ChevronLeft } from 'lucide-react';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}


const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [evidence, setEvidence] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (isOpen && widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-whatsapp-widget', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      window.removeEventListener('open-whatsapp-widget', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = () => {
    // Capturar UTMs Persistidas (Tráfego Pago)
    const utmSource = localStorage.getItem('utm_source') || new URLSearchParams(window.location.search).get('utm_source');
    const utmCampaign = localStorage.getItem('utm_campaign') || new URLSearchParams(window.location.search).get('utm_campaign');
    const gclid = localStorage.getItem('gclid');
    const fbclid = localStorage.getItem('fbclid');

    let text = "Olá, estou precisando de orientação jurídica.";
    
    if (reason) text += `\n\n*Motivo do contato:* ${reason}`;
    if (evidence) text += `\n*Provas disponíveis:* ${evidence}`;
    
    // 🚀 Optimization: Forward Tracking parameters visually to the Sales Team via WhatsApp message
    if (utmSource || utmCampaign) {
      text += `\n\n_(Origem: ${utmSource || 'N/A'} / ${utmCampaign || 'N/A'})_`;
    }
    if (gclid) text += `\n_(G-ClickID capturado)_`;
    if (fbclid) text += `\n_(FB-ClickID capturado)_`;

    // Disparar evento Padrão de Conversão para o Google Ads / Meta Ads (via GTM)
    window.dataLayer = window.dataLayer || [];
    
    // Calcula o tempo do usuário na página até a conversão (Ajuda IAs a filtrarem Bots)
    let timeToConvert = 0;
    if (window.performance && window.performance.timing) {
      timeToConvert = Math.round((Date.now() - window.performance.timing.navigationStart) / 1000);
    }

    // Gera um ID único de evento para Deduplicação (Obrigatório para Meta Conversions API - CAPI)
    const eventId = 'lead_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000);

    
    // Disparo Nativo Meta Pixel (Garante a conversão mesmo se o GTM falhar)
    // Usamos eventID para a Deduplicação com a CAPI
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: reason || 'Contato WhatsApp',
        currency: 'BRL',
        value: 150.00
      }, { eventID: eventId });
    }

    
    // 🧠 GOOGLE ADS ENHANCED CONVERSIONS (Conversões Otimizadas)
    // Prepara o objeto de dados do usuário (User Data) para o Google Ads e Meta Advanced Matching.
    // O GTM irá fazer o hash (SHA-256) automaticamente antes de enviar para o servidor.
    
    // Tenta capturar dados de campanhas de e-mail marketing passados pela URL (ex: ?em=cliente@email.com&ph=557199999999)
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('em') || localStorage.getItem('lk_em') || undefined;
    const userPhone = urlParams.get('ph') || localStorage.getItem('lk_ph') || undefined;
    
    if (userEmail) localStorage.setItem('lk_em', userEmail);
    if (userPhone) localStorage.setItem('lk_ph', userPhone);

    const enhancedData = {
      email: userEmail,
      phone_number: userPhone,
      address: {
        first_name: undefined,
        last_name: undefined,
        street: undefined,
        city: undefined,
        region: undefined,
        postal_code: undefined,
        country: 'BR'
      }
    };

    window.dataLayer.push({
      event: 'generate_lead',
      event_id: eventId,
      lead_type: reason,
      has_evidence: evidence,
      currency: 'BRL',
      value: 150.00,
      utm_source: utmSource,
      utm_campaign: utmCampaign,
      gclid: gclid,
      fbclid: fbclid,
      time_to_convert_seconds: timeToConvert,
      // Injeção direta para o Enhanced Conversions do Google Ads
      user_data: enhancedData
    });
    
    // Injeção para o Meta Advanced Matching na hora do clique
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const advancedMatchingData: any = {};
      if (userEmail) advancedMatchingData.em = userEmail; // O Facebook faz o hash automaticamente
      if (userPhone) advancedMatchingData.ph = userPhone;
      
      if (Object.keys(advancedMatchingData).length > 0) {
         // Atualiza a inicialização do pixel com os dados do usuário para fechar o cerco do rastreio
         (window as any).fbq('init', 'COLOQUE_SEU_PIXEL_ID_AQUI', advancedMatchingData);
      }
    }


    
    const fbp = getCookie('_fbp') || 'N/A';
    const fbc = getCookie('_fbc') || 'N/A';
    
    const trackingString = `\n\n---\n🎫 [TKT-${Math.floor(1000 + Math.random() * 9000)}]\nSrc: ${utmSource}\nCmp: ${utmCampaign}\nFBP: ${fbp}\nFBC: ${fbc}`;

    const encodedMessage = encodeURIComponent(
      `Olá, Dr. Lucas. Preciso de ajuda sobre: *${reason || 'Direito Digital'}*.
Já possuo provas documentadas: *${evidence || 'Não informado'}*` + trackingString
    );

    
    const textUrl = `https://wa.me/5571997129390?text=${encodedMessage}`;
    const deepLinkUrl = `whatsapp://send?phone=5571997129390&text=${encodedMessage}`;

    // 🚀 OTIMIZAÇÃO EXTREMA DE TRÁFEGO PAGO (Bypass de In-App Browser do Instagram/Facebook)
    // Quando o cliente clica no anúncio do Instagram, ele abre o site dentro do navegador embutido do Instagram (WebView).
    // O In-App Browser costuma bloquear o link padrão (wa.me) ou forçar o cliente a fazer login no WhatsApp Web pelo celular (o que mata 40% das conversões).
    // Solução: Detectar In-App Browser e forçar o Deep Link Nativo (whatsapp://).
    
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInstagram = (ua.indexOf('Instagram') > -1);
    const isFacebook = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);

    if (isInstagram || isFacebook) {
      // Força a abertura do aplicativo nativo no celular para salvar a conversão
      window.location.href = deepLinkUrl;
      
      // Fallback de segurança se o DeepLink falhar após 2 segundos
      setTimeout(() => {
        window.location.href = textUrl;
      }, 2000);
    } else {
      const opened = window.open(textUrl, '_blank', 'noopener,noreferrer');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        window.location.href = textUrl;
      }
    }


    setIsOpen(false);
    
    // Reset form after sending
    setTimeout(() => {
      setStep(1);
      setReason('');
      setEvidence('');
    }, 500);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      {/* Triage Card */}
      <div 
        id="whatsapp-triage" className={`mb-4 bg-white rounded-2xl shadow-2xl border border-slate-100 transition-all duration-300 origin-bottom-right flex flex-col ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'} w-[calc(100vw-2rem)] sm:w-[380px] max-h-[80vh] overflow-hidden`}
      >
         <div className="bg-[#25D366] p-4 sm:p-5 text-white flex justify-between items-center shrink-0">
           <div className="flex items-center gap-3">
             {step > 1 && (
               <button aria-label="Voltar etapa anterior" onClick={() => setStep(step - 1)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors flex-shrink-0">
                 <ChevronLeft className="w-5 h-5" />
               </button>
             )}
             <div>
               <h3 className="font-bold text-base sm:text-lg leading-tight">Atendimento Especializado</h3>
               <p className="text-xs sm:text-sm text-green-50 mt-1">Respostas em poucos minutos</p>
             </div>
           </div>
           <button aria-label="Fechar janela do WhatsApp" onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 sm:p-1.5 rounded-full transition-colors flex-shrink-0">
             <X className="w-5 h-5"/>
           </button>
         </div>
         
         <div className="p-4 sm:p-6 bg-slate-50 overflow-y-auto">
            {step === 1 && (
              <div className="animate-fade-in">
                <p className="text-sm font-bold text-slate-700 mb-4">1. Qual a situação principal?</p>
                <div className="space-y-2.5">
                  {[
                    "Vazamento real de fotos/vídeos íntimos",
                    "Criação de montagem/Deepfake (IA) de nudez",
                    "Extorsão/Sextorsão (Ameaça de vazamento)",
                    "Outro caso de exposição íntima"
                  ].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setReason(opt); setStep(2); }}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all shadow-sm flex items-center justify-between group"
                    >
                      {opt}
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-[#25D366] flex-shrink-0 ml-2"></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <p className="text-sm font-bold text-slate-700 mb-4">2. Você possui prints, links ou provas?</p>
                <div className="space-y-2.5">
                  {[
                    "Sim, já reuni todas as provas",
                    "Tenho algumas provas",
                    "Não tenho provas / Não sei como coletar"
                  ].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setEvidence(opt); setStep(3); }}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all shadow-sm flex items-center justify-between group"
                    >
                      {opt}
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-[#25D366] flex-shrink-0 ml-2"></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in flex flex-col items-center text-center py-2">
                <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <p className="font-bold text-slate-900 text-lg mb-2">Tudo pronto!</p>
                <p className="text-sm text-slate-600 mb-6">Triagem concluída. Fale agora com nossa equipe de forma 100% sigilosa.</p>
                
                <button 
                  onClick={handleSend}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Send className="w-5 h-5" />
                  Iniciar conversa segura
                </button>
                
                <button aria-label="Refazer questionário inicial" onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-slate-700 mt-5 underline">
                  Refazer opções
                </button>
              </div>
            )}
         </div>
      </div>

      {/* Floating Button */}
      <button
        
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group relative z-50`}
        aria-label="Abrir atendimento WhatsApp" aria-expanded={isOpen} aria-controls="whatsapp-triage"
      >
        {isOpen ? <X className="w-8 h-8" /> : (
          <>
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current relative z-10" aria-hidden="true" focusable="false">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span className="absolute right-full mr-4 bg-white text-slate-900 text-sm font-bold px-4 py-3 rounded-xl shadow-lg whitespace-nowrap hidden md:block">
              Fale no WhatsApp
              <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45"></span>
            </span>
            <span className="absolute flex h-full w-full inset-0 z-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
