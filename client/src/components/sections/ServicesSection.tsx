export default function ServicesSection() {
  const services = [
    {
      icon: '🛒',
      title: 'Venda de Equipamentos',
      desc: 'Distribuição oficial das melhores marcas: NSK, Kavo, W&H, Dabi Atlante e muito mais.',
      items: ['Alta rotação', 'Baixa rotação', 'Fotopolimerizadores', 'Destartarizadores'],
    },
    {
      icon: '🔧',
      title: 'Manutenção Técnica',
      desc: 'Equipe especializada em manutenção preventiva e corretiva com peças originais.',
      items: ['Revisão completa', 'Substituição de peças', 'Lubrificação', 'Diagnóstico digital'],
    },
    {
      icon: '📦',
      title: 'Locação de Equipamentos',
      desc: 'Alugue equipamentos de alta qualidade com contrato flexível e suporte incluído.',
      items: ['Contrato mensal', 'Sem entrada', 'Suporte incluído', 'Troca garantida'],
    },
    {
      icon: '🚚',
      title: 'Entrega Express',
      desc: 'Entregas rápidas para todo o Brasil com rastreamento em tempo real.',
      items: ['Todo o Brasil', 'Embalagem segura', 'Seguro incluso', 'Rastreamento'],
    },
  ];

  return (
    <section id="servicos" className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A3A6B] rounded-full px-4 py-1.5 mb-4 text-sm font-semibold">
            ⚙️ Nossos Serviços
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            Soluções Completas para{' '}
            <span className="text-[#1A3A6B]">Sua Clínica</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Do equipamento novo à manutenção preventiva, cuidamos de tudo para que você foque no que importa: seus pacientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1">
                {s.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-[#1A3A6B] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-black mb-2">Precisa de um orçamento?</h3>
          <p className="text-blue-200 mb-6">
            Fale com nossos especialistas e receba uma proposta personalizada em minutos.
          </p>
          <a
            href="https://wa.me/5598981905646?text=Olá! Gostaria de solicitar um orçamento."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0ea572] text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg"
          >
            💬 Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
}
