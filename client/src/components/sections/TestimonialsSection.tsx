export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Dra. Fernanda Lima',
      role: 'Clínica Odonto Premium — São Luís, MA',
      text: 'Comprei um kit completo de alta rotação NSK. Chegou em 2 dias, embalagem perfeita e os equipamentos funcionando desde o primeiro uso. Atendimento nota 10!',
      rating: 5,
    },
    {
      name: 'Dr. Carlos Mendes',
      role: 'Consultório particular — Imperatriz, MA',
      text: 'Terceirizei a manutenção dos meus equipamentos para a My Tec Odonto e nunca mais tive problemas. Técnicos super competentes e preço justo.',
      rating: 5,
    },
    {
      name: 'Dra. Ana Paula Costa',
      role: 'Clínica Sorriso Feliz — Timon, MA',
      text: 'O plano de locação transformou minha clínica. Sem investimento inicial alto e com equipamentos sempre novos. Recomendo para todos os colegas!',
      rating: 5,
    },
    {
      name: 'Dr. Ricardo Alves',
      role: 'OdontoSaúde — Bacabal, MA',
      text: 'Já comprei várias peças pelo catálogo. Os preços são competitivos e a entrega é rápida. O suporte pós-venda é excelente — resolveram uma dúvida por chamada de vídeo!',
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A3A6B] rounded-full px-4 py-1.5 mb-4 text-sm font-semibold">
            ⭐ Depoimentos
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            O Que Nossos{' '}
            <span className="text-[#1A3A6B]">Clientes Dizem</span>
          </h2>
          <p className="text-gray-500">
            5.0 estrelas no Google • 9 avaliações • 100% de recomendação
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-5 text-sm">"{t.text}"</p>
              <div>
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="https://wa.me/5598981905646?text=Olá! Gostaria de mais informações."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1A3A6B] hover:bg-[#152f58] text-white font-bold px-8 py-3.5 rounded-2xl transition-colors shadow-md"
          >
            💬 Falar com um Especialista
          </a>
        </div>
      </div>
    </section>
  );
}
