import { Shield, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-500 py-12 border-t border-slate-100">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Legal Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="font-serif font-bold text-slate-900 text-lg tracking-tight">Lucas Karam<span className="text-blue-600">.</span></span>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-slate-700">Lucas Karam Advocacia e Consultoria</p>
            <p>CNPJ: 00.000.000/0001-00</p>
            <p>OAB/BA 56.878</p>
          </div>
        </div>
        
        {/* Contact & Local SEO Corroboration */}
        <div className="flex flex-col gap-4 text-sm">
          <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-xs">Contato & Endereço</h4>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <address className="not-italic">
              Escritório 100% Digital<br />
              Atendimento Nacional<br />
              Brasil
            </address>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
            <a href="tel:+5571997129390" className="hover:text-blue-600 transition-colors">(71) 99712-9390</a>
          </div>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col gap-4 text-sm md:items-end">
          <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-xs hidden md:block">Legal</h4>
          <a href="/privacidade.html" aria-label="Acessar a Política de Privacidade" className="hover:text-blue-600 transition-colors font-medium">Política de Privacidade</a>
          <a href="/termos.html" aria-label="Termos de Uso" className="hover:text-blue-600 transition-colors font-medium">Termos de Uso</a>
          <div className="md:text-right mt-2">
            <p>&copy; {new Date().getFullYear()} Lucas Karam Advocacia.</p>
            <p>Todos os direitos reservados.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
