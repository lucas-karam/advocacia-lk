import { Mail, MapPin, Phone, Instagram, Globe, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contato" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-blue-900 text-white rounded-3xl shadow-xl overflow-hidden">
          
          <div className="p-10 md:p-14 flex flex-col items-center text-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Atendimento Sigiloso</h2>
              <p className="text-blue-100 mb-10 leading-relaxed max-w-xl mx-auto text-lg">
                Nossa equipe jurídica especializada em Direito Digital está pronta para agir. Entre em contato e receba suporte jurídico imediato com discrição absoluta.
              </p>
              
              <div className="space-y-6 flex flex-col items-center">
                <button 
                  onClick={(e) => { e.preventDefault(); window.dataLayer = window.dataLayer || []; window.dataLayer.push({event: 'cta_click', button_location: 'footer_contact'}); window.dispatchEvent(new Event('open-whatsapp-widget')); }}
                  className="flex items-center gap-4 bg-white text-blue-900 px-8 py-4 rounded-xl hover:bg-blue-50 hover:-translate-y-1 transition-all shadow-lg w-full max-w-md justify-center"
                >
                  <Phone className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-bold text-lg">Falar no WhatsApp</p>
                    <p className="text-sm text-blue-800">Atendimento Especializado</p>
                  </div>
                </button>
                
                <a 
                  href="mailto:contato@lucaskaram.com.br" 
                  onClick={() => { 
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ event: 'email_click', link_url: 'mailto:contato@lucaskaram.com.br' });
                  }} 
                  className="flex items-center gap-4 hover:text-blue-200 transition-colors"
                  aria-label="Enviar e-mail para contato"
                >
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-blue-200">E-mail Comercial</p>
                    <p className="font-semibold text-lg">
                      <span className="hidden">bot-trap@</span>
                      {'contato'}<span>@</span>{'lucaskaram.com.br'}
                    </p>
                  </div>
                </a>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-blue-200">Localização</p>
                    <p className="font-semibold text-lg">Atuação Nacional (Escritório 100% Digital)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-blue-800 flex gap-6 justify-center w-full">
              <a aria-label="Acessar Instagram de Lucas Karam" href="https://instagram.com/proflucaskaram" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a aria-label="Acessar LinkedIn de Lucas Karam" href="https://www.linkedin.com/in/lucas-karam/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a aria-label="Acessar o site institucional" href="https://lucaskaram.com.br" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
