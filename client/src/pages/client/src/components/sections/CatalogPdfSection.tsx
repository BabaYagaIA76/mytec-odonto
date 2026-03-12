/**
 * CatalogPdfSection — My Tec. Odonto Soluções
 * Visualizador do Catálogo Primos Março 2026 com navegação por páginas
 */

import { useState, useCallback } from 'react';
import {
  ChevronLeft, ChevronRight, Download, MessageCircle,
  BookOpen, ZoomIn, ZoomOut, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOTAL_PAGES = 66;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  src: `/catalogo/page_${String(i + 1).padStart(2, '0')}.jpg`,
  page: i + 1,
}));

export default function CatalogPdfSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const goTo = useCallback((n: number) => {
    setCurrentPage(Math.max(1, Math.min(TOTAL_PAGES, n)));
  }, []);

  // Páginas visíveis na grade (2 por vez estilo livro, + prev/next)
  const displayPages = [currentPage];
  if (currentPage < TOTAL_PAGES) displayPages.push(currentPage + 1);

  const thumbnailStart = Math.max(1, currentPage - 2);
  const thumbnailEnd = Math.min(TOTAL_PAGES, thumbnailStart + 6);
  const thumbnails = Array.from(
    { length: thumbnailEnd - thumbnailStart + 1 },
    (_, i) => thumbnailStart + i
  );

  return (
    <section id="catalogo" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1A3A6B] rounded-full px-4 py-1.5 mb-4 text-sm font-semibold">
            <BookOpen size={14} />
            Catálogo de Peças
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
            Catálogo Completo{' '}
            <span className="text-[#1A3A6B]">Março 2026</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Folheie nosso catálogo completo com todas as peças disponíveis. Pague em até 6x sem juros no cartão!
          </p>

          {/* Download PDF */}
          <div className="flex justify-center gap-3 mt-5 flex-wrap">
            <a
              href="https://wa.me/5598981905646?text=Olá! Gostaria de receber o catálogo completo em PDF."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A3A6B] hover:bg-[#152f58] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-md"
            >
              <Download size={16} />
              Receber PDF pelo WhatsApp
            </a>
            <a
              href="https://wa.me/5598981905646?text=Olá! Quero fazer um pedido pelo catálogo de março 2026."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fba59] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-md"
            >
              <MessageCircle size={16} />
              Fazer Pedido via WhatsApp
            </a>
          </div>
        </div>

        {/* Viewer — Book layout */}
        <div className="max-w-5xl mx-auto">

          {/* Page counter */}
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-sm text-gray-500 font-medium">
              Página {currentPage} de {TOTAL_PAGES}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Clique na página para ampliar</span>
              <ZoomIn size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Main viewer */}
          <div className="bg-[#1A3A6B]/5 rounded-3xl p-4 md:p-6 border border-[#1A3A6B]/10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {displayPages.map(pageNum => (
                <div
                  key={pageNum}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-zoom-in group border border-gray-100"
                  onClick={() => setLightbox(pageNum)}
                >
                  <img
                    src={`/catalogo/page_${String(pageNum).padStart(2, '0')}.jpg`}
                    alt={`Catálogo página ${pageNum}`}
                    className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#1A3A6B]/0 group-hover:bg-[#1A3A6B]/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 shadow-lg">
                      <ZoomIn size={20} className="text-[#1A3A6B]" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    {pageNum}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => goTo(currentPage - 2)}
              disabled={currentPage <= 1}
              className="flex items-center gap-2 border-[#1A3A6B]/20 text-[#1A3A6B] hover:bg-[#1A3A6B] hover:text-white disabled:opacity-30 rounded-xl px-4"
            >
              <ChevronLeft size={18} />
              Anterior
            </Button>

            {/* Page input */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <input
                type="number"
                min={1}
                max={TOTAL_PAGES}
                value={currentPage}
                onChange={e => goTo(Number(e.target.value))}
                className="w-12 text-center font-bold text-[#1A3A6B] bg-transparent outline-none text-sm"
              />
              <span className="text-gray-400 text-sm">/ {TOTAL_PAGES}</span>
            </div>

            <Button
              onClick={() => goTo(currentPage + 2)}
              disabled={currentPage >= TOTAL_PAGES - 1}
              className="flex items-center gap-2 bg-[#1A3A6B] hover:bg-[#152f58] text-white disabled:opacity-30 rounded-xl px-4"
            >
              Próximo
              <ChevronRight size={18} />
            </Button>
          </div>

          {/* Thumbnails strip */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 justify-center">
            {thumbnails.map(pageNum => (
              <button
                key={pageNum}
                onClick={() => goTo(pageNum % 2 === 0 ? pageNum - 1 : pageNum)}
                className={`flex-shrink-0 w-14 rounded-lg overflow-hidden border-2 transition-all ${
                  pageNum === currentPage || pageNum === currentPage + 1
                    ? 'border-[#1A3A6B] shadow-md scale-105'
                    : 'border-gray-200 hover:border-[#1A3A6B]/40 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={`/catalogo/page_${String(pageNum).padStart(2, '0')}.jpg`}
                  alt={`Página ${pageNum}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <div className="text-center text-xs text-gray-500 py-0.5 bg-white">{pageNum}</div>
              </button>
            ))}
          </div>

          {/* Jump to page buttons */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {[1, 11, 21, 31, 41, 51, 61].map(p => (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  currentPage >= p && currentPage < p + 10
                    ? 'bg-[#1A3A6B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-[#1A3A6B]/10 hover:text-[#1A3A6B]'
                }`}
              >
                Pág {p}–{Math.min(p + 9, TOTAL_PAGES)}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#1A3A6B] to-[#0D1B3E] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">Encontrou o que precisa?</h3>
            <p className="text-blue-200 text-sm">
              Pague em até <strong className="text-[#10B981]">6x sem juros</strong> no cartão. Entrega express para todo Brasil.
            </p>
          </div>
          <a
            href="https://wa.me/5598981905646?text=Olá! Quero fazer um pedido pelo catálogo de março 2026. Segue minha lista:"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fba59] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pedir via WhatsApp
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox(Math.max(1, lightbox - 1)); }}
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={`/catalogo/page_${String(lightbox).padStart(2, '0')}.jpg`}
            alt={`Página ${lightbox}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox(Math.min(TOTAL_PAGES, lightbox + 1)); }}
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
            Página {lightbox} de {TOTAL_PAGES}
          </div>
        </div>
      )}
    </section>
  );
}
