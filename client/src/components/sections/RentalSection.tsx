export default function RentalSection() {
  const plans = [
    {
      name: 'Starter',
      price: 'R$ 299',
      period: '/mês',
      desc: 'Ideal para consultórios iniciantes',
      features: [
        '1 equipamento à escolha',
        'Manutenção preventiva incluída',
        'Suporte via WhatsApp',
        'Troca em caso de defeito',
      ],
      highlight: false,
    },
    {
      name: 'Profissional',
      price: 'R$ 599',
      period: '/mês',
      desc: 'Para clínicas em crescimento',
      features: [
        'Até 3 equipamentos',
        'Manutenção preventiva incluída',
        'Suporte prioritário 24h',
        'Troca expressa em 24h',
        'Calibração mensal',
      ],
      highlight: true,
    },
    {
      name: 'Clínica',
      price: 'R$ 999',
      period: '/mês',
      desc: 'Para grandes clínicas e laboratórios',
      features: [
        'Equipamentos ilimitados',
        'Manutenção preventiva e corretiva',
        'Suporte dedicado',
        'Troca imediata',
        'Visita técnica mensal',
        'Relatório de uso',
      ],
      highlight: false,
    },
  ];

  return (
    <section id="locacao" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A3A6B] rounded-full px-4 py-1.5 mb-4 text-sm font-semibold">
            📦 Locação
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            Alugue Sem Burocracia,{' '}
            <span className="text-[#1A3A6B]">Use Sem Preocupação</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Equipamentos sempre novos e revisados. Sem entrada, sem contrato longo. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`rounded-2xl p-7 border-2 transition-all ${
                plan.highlight
                  ? 'border-[#1A3A6B] bg-[#1A3A6B] text-white shadow-xl scale-105'
                  : 'border-gray-100 bg-white shadow-sm'
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-bold bg-[#10B981] text-white rounded-full px-3 py-1 inline-block mb-3">
                  MAIS POPULAR
                </div>
              )}
              <h3 className={`text-lg font-black mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-xs mb-4 ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>
                {plan.desc}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-black ${plan.highlight ? 'text-[#10B981]' : 'text-[#1A3A6B]'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-[#10B981]">✓</span>
                    <span className={plan.highlight ? 'text-blue-100' : 'text-gray-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/5598981905646?text=Olá! Tenho interesse no plano de locação."
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center font-bold py-2.5 rounded-xl transition-colors text-sm ${
                  plan.highlight
                    ? 'bg-[#10B981] hover:bg-[#0ea572] text-white'
                    : 'border-2 border-[#1A3A6B] text-[#1A3A6B] hover:bg-[#1A3A6B] hover:text-white'
                }`}
              >
                Contratar
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Valores sob consulta. Condições especiais para contratos anuais.
        </p>
      </div>
    </section>
  );
}
