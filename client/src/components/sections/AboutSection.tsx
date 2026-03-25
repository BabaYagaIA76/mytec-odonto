export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A3A6B] rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
              🏢 Sobre Nós
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Referência em{' '}
              <span className="text-[#1A3A6B]">Equipamentos Odontológicos</span>{' '}
              no Maranhão
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A My Tec Odonto é especializada na distribuição, manutenção e locação de equipamentos
              odontológicos de alta performance. Atendemos consultórios, clínicas e laboratórios
              em todo o Brasil.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Com produtos das melhores marcas do mercado — NSK, Kavo, W&H, Dabi e outras —
              oferecemos soluções completas para todos os perfis de profissionais da odontologia.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🛡️', title: 'Garantia Total', desc: 'Todos os produtos com garantia de fábrica' },
                { icon: '🚀', title: 'Entrega Rápida', desc: 'Express para todo o Brasil' },
                { icon: '🔧', title: 'Suporte Técnico', desc: 'Equipe especializada disponível' },
                { icon: '💳', title: 'Facilidade', desc: 'Até 6x sem juros no cartão' },
              ].map(item => (
                <div key={item.title} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1A3A6B] to-[#0D2B4E] rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-black mb-8 text-center">Nossa Missão</h3>
            <div className="space-y-6">
              {[
                { num: '01', title: 'Qualidade', desc: 'Produtos originais das melhores marcas mundiais' },
                { num: '02', title: 'Confiança', desc: 'Transparência e honestidade em cada negociação' },
                { num: '03', title: 'Excelência', desc: 'Suporte técnico especializado e pós-venda dedicado' },
              ].map(item => (
                <div key={item.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] font-black text-sm">
                    {item.num}
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">{item.title}</div>
                    <div className="text-blue-200 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <div className="text-4xl font-black text-[#10B981] mb-1">5.0 ★</div>
              <div className="text-blue-200 text-sm">Avaliação Google — 9 reviews</div>
              <div className="text-blue-300 text-xs mt-1">CNPJ 35.744.273/0001-25</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
