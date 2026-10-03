import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "O meu caso será mantido em sigilo?",
    answer: "Sim, absolutamente. Atuamos sob rigoroso sigilo profissional estabelecido por lei. Nosso primeiro contato, a análise do caso e o processo judicial ocorrem de forma 100% confidencial, inclusive sob o regime de Segredo de Justiça nos tribunais."
  },
  {
    question: "É possível remover fotos reais e vídeos rapidamente?",
    answer: "Sim. Realizamos notificações extrajudiciais e aplicamos as medidas tecnológicas pertinentes, além de ingressarmos com pedidos de liminar (tutela de urgência). Uma vez concedida a liminar, as plataformas (como Google, X, Meta e sites adultos) recebem um prazo curtíssimo (frequentemente 24h) para excluir o conteúdo, sob pena de multa diária."
  },
  {
    question: "Fizeram uma montagem minha de nudez com IA (Deepfake). Tem como remover?",
    answer: "Absolutamente. A criação e o compartilhamento de deepfakes íntimos configuram crime e violação gravíssima de direitos. O processo de remoção e a busca pela identificação do autor (via IP) são tão rigorosos quanto no vazamento de fotos reais."
  },
  {
    question: "Estou sofrendo Sextorsão (chantagem). O que fazer?",
    answer: "Não ceda à chantagem e não apague as conversas. Criminosos costumam pedir dinheiro para não vazar fotos. Nossa equipe atua bloqueando a exposição, preservando provas legais e envolvendo as autoridades competentes de forma sigilosa."
  },
  {
    question: "Eu não sei quem vazou o material. Como proceder?",
    answer: "Esse é um cenário comum. Por meio de ordens judiciais, obrigamos as plataformas digitais a fornecerem os registros de acesso (endereços IP, dados cadastrais e logs) de quem publicou o material. Com isso, conseguimos identificar o criminoso para responsabilização cível e penal."
  },
  {
    question: "Moro em outro estado. Vocês podem me atender?",
    answer: "Com certeza. Nosso atendimento e atuação são 100% digitais. Os processos judiciais no Brasil são totalmente eletrônicos, o que nos permite representar clientes em qualquer cidade ou estado do país com a mesma agilidade e eficácia."
  },
  {
    question: "Posso pedir indenização por danos morais?",
    answer: "Sim. O vazamento não consentido de material íntimo ou a utilização não autorizada de imagem (como deep fakes) geram o direito inquestionável à reparação por danos morais, além da obrigação do criminoso de arcar com todos os custos."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    
    // SEO / Tráfego Pago: Rastrear micro-conversão de leitura de FAQ
    if (isOpening && typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'faq_interaction',
        faq_question: faqs[index].question
      });
    }
  };

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-slate-600">
              Esclareça suas principais dúvidas sobre o processo de defesa e proteção digital.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-blue-200 bg-blue-50/50 shadow-sm' : 'border-slate-100 bg-white hover:border-blue-100'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-lg pr-8">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div 
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
