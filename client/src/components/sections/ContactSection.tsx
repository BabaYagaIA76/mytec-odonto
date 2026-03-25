export default function ContactSection() {
  return (
    <section id="contato" className="py-20 lg:py-28 bg-gradient-to-br from-[#0D1B3E] via-[#1A3A6B] to-[#0D2B4E]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-1.5 mb-4 text-sm font-semibold">
            📞 Contato
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Fale Conosco <span className="text-[#10B981]">Agora</span>
          </h2>
          <p className="text-blue-200 max-w-lg mx-auto">
            Estamos prontos para atender você. Entre em contato pelo canal de sua preferência.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {[
            {
              icon: '💬',
              label: 'WhatsApp',
              value: '(98) 98190-5646',
              href: 'https://wa.me/5598981905646',
              cta: 'Enviar mensagem',
            },
            {
              icon: '📍',
              label: 'Localização',
              value: 'São Luís — MA',
              href: '#',
              cta: 'Ver no mapa',
            },
            {
              icon: '🕐',
              label: 'Horário',
              value: 'Seg–Sex: 8h–18h',
              href: 'https://wa.me/5598981905646',
              cta: 'Falar agora',
            },
          ].map(c => (
            <div key={c.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl mb-3">{c.icon}</div>
              <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">{c.label}</div>
              <div className="text-white font-bold mb-4">{c.value}</div>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10B981] text-sm font-semibold hover:underline"
              >
                {c.cta} →
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/5598981905646?text=Olá! Gostaria de entrar em contato com a My Tec Odonto."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fba59] text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Iniciar Conversa no WhatsApp
          </a>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-blue-300 text-sm">
            © 2026 My Tec Odonto · CNPJ 35.744.273/0001-25 · São Luís, Maranhão
          </p>
        </div>
      </div>
    </section>
  );
}
