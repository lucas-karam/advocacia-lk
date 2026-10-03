import { MessageSquare, Gavel, Shield, HeartHandshake } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "1. Contato Seguro e Sigiloso",
    description: "Você entra em contato através do nosso canal criptografado. Realizamos um primeiro atendimento com total empatia, sem julgamentos e sob absoluto sigilo profissional advogado-cliente."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "2. Coleta de Provas Digitais",
    description: "Orientamos sobre como preservar as evidências. Realizamos o registro das provas através de Ata Notarial ou ferramentas blockchain para garantir a validade judicial contra os criminosos."
  },
  {
    icon: <Gavel className="w-6 h-6" />,
    title: "3. Ação Liminar de Remoção",
    description: "Notificamos extrajudicialmente as plataformas e ingressamos com ação judicial de urgência (liminar) para a remoção imediata de fotos íntimas ou vídeos vazados da internet."
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "4. Indenização e Blindagem",
    description: "Buscamos a responsabilização cível e criminal do autor (indenização por danos morais) e mantemos monitoramento web para evitar novas publicações."
  }
];

export default function Process() {
  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900">
            Como funciona nossa atuação
          </h2>
          <p className="text-lg text-slate-600">
            Um processo estruturado para agir com velocidade, eficácia técnica e acolhimento humano no momento em que você mais precisa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-slate-200"></div>
              )}
              
              <div className="relative z-10 bg-white border border-slate-200 rounded-2xl p-6 h-full hover:border-blue-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
