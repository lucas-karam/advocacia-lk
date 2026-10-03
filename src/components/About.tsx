import { Award, BookOpen, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div 
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              {/* Using a sophisticated placeholder structure for the professional */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 relative z-10">
                <img loading="lazy" decoding="async" fetchPriority="low" 
                  src="https://lucaskaram.com.br/wp-content/uploads/2024/01/Lucas-karam.jpg" 
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/cnj-lucas-karam.jpg')) {
                      target.src = '/cnj-lucas-karam.jpg';
                    }
                  }}
                  width="800" height="1000"
                  alt="Prof. Lucas Karam - Advogado Especialista em Direito Digital, Crimes Cibernéticos e Internet"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-bold text-xl">Lucas Karam</p>
                  <p className="text-blue-300 text-sm">Advogado & Professor</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-50 rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-slate-50 rounded-full -z-10"></div>
            </div>
          </div>

          <div 
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
              Especialista em Direito Digital e Crimes Cibernéticos
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Com profunda expertise na intersecção entre o Direito e a Tecnologia, o <strong>Prof. Lucas Karam</strong> atua de forma decisiva na defesa de vítimas de crimes cibernéticos, especialmente no combate ao vazamento de conteúdos íntimos e <em>revenge porn</em>.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Reconhecido por sua atuação estratégica e pioneira, coordena capacitações jurídicas e presta consultoria em casos de alta complexidade digital, aliando rigor acadêmico à prática incisiva nos tribunais.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Defesa Especializada</h4>
                  <p className="text-slate-600">Atuação técnica focada em resultados rápidos e proteção integral da vítima.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Referência Acadêmica</h4>
                  <p className="text-slate-600">Professor e coordenador de pós-graduação em tecnologia jurídica e IA.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Atendimento Sigiloso</h4>
                  <p className="text-slate-600">Garantia absoluta de discrição, acolhimento e respeito em todas as etapas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
