export default function MaintenanceSection() {
  const steps = [
    { num: '01', title: 'Diagnóstico', desc: 'Avaliação completa do equipamento com checklist técnico digital.' },
    { num: '02', title: 'Orçamento', desc: 'Orçamento transparente enviado por WhatsApp em até 2 horas.' },
    { num: '03', title: 'Execução', desc: 'Manutenção realizada por técnicos certificados com peças originais.' },
    { num: '04', title: 'Garantia', desc: 'Garantia de 90 dias em todos os serviços executados.' },
  ];

  const brands = ['NSK', 'Kavo', 'W&H', 'Dabi', 'Gnatus', 'Saevo', 'Driller', 'Inovadent'];

  return (
    <section id="manutencao" className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A3A6B] rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
              🔧 Manutenção
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Seu Equipamento{' '}
              <span className="text-[#1A3A6B]">em Mãos Experientes</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Técnicos certificados pelas fabricantes realizam manutenções preventivas e corretivas
              com peças 100% originais, garantindo performance e durabilidade máximas.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: '🏆', label: 'Peças 100% originais' },
                { icon: '⚡', label: 'Atendimento rápido' },
                { icon: '📋', label: 'Laudo técnico digital' },
                { icon: '🛡️', label: 'Garantia de 90 dias' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Marcas Atendidas
              </p>
              <div className="flex flex-wrap gap-2">
                {brands.map(b => (
                  <span
                    key={b}
                    className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="flex gap-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center font-black text-sm">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/5598981905646?text=Olá! Preciso de manutenção em meu equipamento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fba59] text-white font-bold py-3.5 rounded-2xl transition-colors shadow-md mt-2"
            >
              📞 Solicitar Manutenção
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
