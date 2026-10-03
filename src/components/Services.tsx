import { ShieldAlert, FileSearch, Scale, Fingerprint, CameraOff, Video } from 'lucide-react';

const services = [
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: "Remoção Urgente (Liminar)",
    description: "Atuação estratégica para apagar conteúdos íntimos de redes sociais, WhatsApp e sites adultos através de medidas judiciais urgentes (liminares)."
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Combate a Deepfakes (IA)",
    description: "Defesa especializada contra montagens de nudez criadas por Inteligência Artificial (Deepfakes), atuando com força tecnológica e jurídica para exclusão do material e punição dos criadores."
  },
  {
    icon: <CameraOff className="w-6 h-6" />,
    title: "Sextorsão e Ameaças",
    description: "Intervenção jurídica imediata contra criminosos que exigem dinheiro ou mais fotos sob a ameaça de vazar seu conteúdo íntimo para amigos e familiares."
  },
  {
    icon: <Fingerprint className="w-6 h-6" />,
    title: "Identificação de Criminosos",
    description: "Quebra de sigilo telemático e rastreio avançado de IPs para descobrir a identidade real de quem vazou ou criou perfis falsos com sua imagem."
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Reparação (Danos Morais)",
    description: "Ações judiciais indenizatórias para buscar a reparação financeira rigorosa pelos danos emocionais e de imagem sofridos pela vítima."
  },
  {
    icon: <FileSearch className="w-6 h-6" />,
    title: "Preservação de Provas",
    description: "Coleta legal de evidências (Ata Notarial, metadados) antes que sejam apagadas, garantindo validade contra o criminoso no processo judicial."
  }
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            Nossa Atuação Especializada
          </h2>
          <p className="text-lg text-slate-600">
            Tratamos cada caso com a urgência, o rigor técnico e o sigilo que a situação exige. Entenda como podemos ajudar a recuperar sua paz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
