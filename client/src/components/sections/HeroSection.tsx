import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0D1B3E] via-[#1A3A6B] to-[#0D2B4E] flex items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#5C9EFF]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold">
            🦷 Especialista em Equipamentos Odontológicos
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
            My Tec{' '}
            <span className="text-[#10B981]">Odonto</span>
            <br />
            <span className="text-3xl lg:text-4xl font-light text-blue-200">
              Soluções em Equipamentos Dentários
            </span>
          </h1>

          <p className="text-blue-200 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl">
            Distribuição, manutenção e locação de equipamentos odontológicos de alta qualidade.
            Atendemos consultórios e clínicas em todo o Brasil com excelência e rapidez.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/5598981905646?text=Olá! Gostaria de mais informações sobre os produtos."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fba59] text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar pelo WhatsApp
            </a>

            <a
              href="#catalogo"
              className="flex items-center gap-2 border-2 border-white/20 hover:border-white/60 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/10"
            >
              📋 Ver Catálogo
            </a>

            <Link
              to="/admin"
              className="flex items-center gap-2 border-2 border-[#10B981]/40 hover:border-[#10B981] text-[#10B981] font-bold px-6 py-4 rounded-2xl text-base transition-all hover:bg-[#10B981]/10"
            >
              🔐 Sistema
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12">
            {[
              { value: '65+', label: 'Produtos' },
              { value: '5★', label: 'Avaliação Google' },
              { value: '100%', label: 'Garantia' },
              { value: '24h', label: 'Suporte' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-blue-300 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
