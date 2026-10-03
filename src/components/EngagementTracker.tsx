import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export default function EngagementTracker() {
  useEffect(() => {
    // 7. Monitoramento Real de Performance (Core Web Vitals p/ GA4 e Google Ads)
    // Envia dados de LCP, FID, CLS para o DataLayer para otimizar o índice de qualidade da Landing Page
    if (typeof PerformanceObserver !== 'undefined') {
      const sendToDataLayer = (name: string, value: number) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'core_web_vitals',
          metric_name: name,
          metric_value: value,
        });
      };

      let lcpObserver: PerformanceObserver | undefined;
      let clsObserver: PerformanceObserver | undefined;

      try {
        // Largest Contentful Paint (LCP)
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            sendToDataLayer('LCP', Math.round(lastEntry.startTime));
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
              sendToDataLayer('CLS', Math.round(clsValue * 1000));
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // Silenciosamente falha em navegadores antigos que não suportam a API
      }

      return () => {
        lcpObserver?.disconnect();
        clsObserver?.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    // 0. Captura e Persistência de UTMs e Click IDs (Google/Facebook)
    
    // 0.0 FIRST-PARTY ID GENERATOR (Bypass Safari ITP / AdBlockers)
    // Gera um ID único e permanente para melhorar a nota de qualidade (EMQ) do Facebook CAPI e Google Ads
    let clientId = localStorage.getItem('adv_client_id');
    if (!clientId) {
      clientId = 'cid_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('adv_client_id', clientId);
    }
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'user_identity_established',
      first_party_client_id: clientId
    });

    
    // 0.1 Captura e Persistência de UTMs
const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmCampaign = urlParams.get('utm_campaign');
    const gclid = urlParams.get('gclid');
    const fbclid = urlParams.get('fbclid');

    if (utmSource) localStorage.setItem('utm_source', utmSource);
    if (utmCampaign) localStorage.setItem('utm_campaign', utmCampaign);
    if (gclid) localStorage.setItem('gclid', gclid);
    if (fbclid) localStorage.setItem('fbclid', fbclid);

    // 0.2 META ADS EXTREME OPTIMIZATION (FBP & FBC extraction)
    // Extrai cookies primários do Facebook se existirem (criados pelo pixel base)
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    
    const fbp = getCookie('_fbp') || 'N/A';
    const fbc = getCookie('_fbc') || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : 'N/A');

    window.dataLayer.push({
      event: 'meta_advanced_matching_ready',
      fbp: fbp,
      fbc: fbc,
      user_agent: navigator.userAgent
    });


    window.dataLayer = window.dataLayer || [];

    // 1.1 Sistema Avançado de Lead Scoring (Pontuação do Visitante)
    let userScore = 0;
    const updateUserScore = (points: number, trigger: string) => {
      userScore += points;
      window.dataLayer.push({
        event: 'lead_score_update',
        current_score: userScore,
        score_trigger: trigger
      });
      if (userScore >= 100 && !localStorage.getItem('is_hot_lead')) {
        localStorage.setItem('is_hot_lead', 'true');
        window.dataLayer.push({ event: 'hot_lead_identified' });
      }
    };

    // 1. Rastreador de Tempo de Página (Público Quente: > 30 segundos)
    const timer = setTimeout(() => {
      window.dataLayer.push({
        event: 'time_on_page',
        duration: '30_seconds'
      });
    }, 30000);

    // 2. Rastreador de Rolagem de Página (Scroll Depth)
    
    // 2. Rastreador de Rolagem de Página OTIMIZADO (Intersection Observer para INP)
    // Em vez de sobrecarregar a Thread Principal com eventos de scroll 60x por segundo,
    // colocamos "fios de tropeço" invisíveis aos 50% e 90% da página.
    let scrolled50 = false;
    let scrolled90 = false;

    // Criar elementos invisíveis para o Observer "tropeçar"
    const createScrollMarker = (id: string, topPercent: string) => {
      let marker = document.getElementById(id);
      if (!marker) {
        marker = document.createElement('div');
        marker.id = id;
        marker.style.position = 'absolute';
        marker.style.top = topPercent;
        marker.style.width = '1px';
        marker.style.height = '1px';
        marker.style.visibility = 'hidden';
        marker.style.pointerEvents = 'none';
        document.body.appendChild(marker);
      }
      return marker;
    };

    const marker50 = createScrollMarker('scroll-marker-50', '50%');
    const marker90 = createScrollMarker('scroll-marker-90', '90%');

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'scroll-marker-50' && !scrolled50) {
            scrolled50 = true;
            window.dataLayer.push({ event: 'scroll_depth', depth: '50_percent' });
            scrollObserver.unobserve(entry.target);
          }
          if (entry.target.id === 'scroll-marker-90' && !scrolled90) {
            scrolled90 = true;
            window.dataLayer.push({ event: 'scroll_depth', depth: '90_percent' });
            scrollObserver.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.1 });

    scrollObserver.observe(marker50);
    scrollObserver.observe(marker90);


    // 3. Rastreador de Leitura de Seções (Intersection Observer p/ Retargeting)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            window.dataLayer.push({
              event: 'section_view',
              section_name: sectionId
            });
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    // 4. Rastreador de Intenção de Saída (Exit Intent - Retenção de Leads)
    let exitIntentTriggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      // Se o mouse sair pelo topo da página (indo para aba/fechar)
      if (e.clientY < 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        
        window.dataLayer.push({
          event: 'exit_intent'
        });

        // Dispara o WhatsApp para tentar salvar o lead
        window.dispatchEvent(new Event('open-whatsapp-widget'));
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // 5. Verificação de Qualidade de Tráfego (Anti-Bot / Human Interaction)
    let humanInteractionLogged = false;
    const handleHumanInteraction = () => {
      if (!humanInteractionLogged) {
        humanInteractionLogged = true;
        const connection = (navigator as any).connection;
        const networkType = connection ? connection.effectiveType : 'unknown';
        const deviceMemory = (navigator as any).deviceMemory || 'unknown';
        window.dataLayer.push({
          event: 'human_interaction_verified',
          network_type: networkType,
          device_memory_gb: deviceMemory
        });
      }
    };
    window.addEventListener('mousemove', handleHumanInteraction, { once: true });
    window.addEventListener('touchstart', handleHumanInteraction, { once: true });

    // 6. Monitoramento de Cliques em E-mail e Telefone
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href) {
        if (link.href.startsWith('mailto:')) {
          window.dataLayer.push({ event: 'email_click', link_url: link.href });
        } else if (link.href.startsWith('tel:')) {
          window.dataLayer.push({ event: 'phone_click', link_url: link.href });
        } else if (link.target === '_blank' && !link.href.includes(window.location.hostname)) {
           window.dataLayer.push({ event: 'outbound_link_click', link_url: link.href });
        }
      }
    };
    document.addEventListener('click', handleLinkClick);

    // 8. Monitoramento de Microrações de Alta Intenção (Cópia de Texto)
    const handleCopy = () => {
      const copiedText = window.getSelection()?.toString();
      if (copiedText && copiedText.length > 5) {
        window.dataLayer.push({
          event: 'text_copied',
          copied_length: copiedText.length
        });
        updateUserScore(15, 'text_copied');
      }
    };
    document.addEventListener('copy', handleCopy);

    // 9. Monitoramento Avançado de Foco de Aba (Tab Visibility)
    let lastVisibilityState = document.visibilityState;
    let hiddenTimeStart = 0;
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hiddenTimeStart = Date.now();
      } else if (document.visibilityState === 'visible' && lastVisibilityState === 'hidden') {
        const timeHidden = Math.round((Date.now() - hiddenTimeStart) / 1000);
        window.dataLayer.push({
          event: 'tab_returned',
          time_away_seconds: timeHidden
        });
        if (timeHidden > 10) updateUserScore(10, 'returned_after_distraction');
      }
      lastVisibilityState = document.visibilityState;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);


    // 10. QUALIFIED LEAD BUILDER (Anti-Bounce / Ultra-Targeting)
    // Dispara apenas quando o usuário provar ALTO INTESSE (Tempo + Scroll + Interação)
    let isQualifiedFired = false;
    let timeSpent = 0;
    
    const qualifiedTimer = setInterval(() => {
      timeSpent += 1;
      if (!isQualifiedFired && timeSpent >= 15 && scrolled50 && userScore >= 15) {
        isQualifiedFired = true;
        
            window.dataLayer.push({
              event: 'qualified_audience_build',
              scroll_depth: '50%',
              time_on_site: '15s_plus'
            });

            // META ADS: Criação de Público de Retargeting Altamente Qualificado
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('trackCustom', 'QualifiedVisit', {
                scroll_depth: 50,
                time_on_site: 15
              });
            }

      }
    }, 1000);


    return () => {
      clearTimeout(timer);
      clearInterval(qualifiedTimer);
      scrollObserver.disconnect();
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleLinkClick);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleHumanInteraction);
      window.removeEventListener('touchstart', handleHumanInteraction);
      observer.disconnect();
      marker50?.remove();
      marker90?.remove();
    };
  }, []);

  return null; // Este componente é invisível, roda apenas nos bastidores
}
